package pcs.carservices;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.io.UnsupportedEncodingException;
import java.util.Date;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author keith
 */
public class TokenHandler {

    private static final Logger LOG = LoggerFactory.getLogger(TokenHandler.class);

    public String generate() throws UnsupportedEncodingException {
        
        String jwt = Jwts.builder()
                .setSubject("users/TzMUocMF4p")
                .setExpiration(new Date(System.currentTimeMillis() + 300000))
                .claim("name", "Robert Token Man")
                .claim("scope", "self groups/admins")
                .signWith(
                        SignatureAlgorithm.HS256,
                        "secret".getBytes("UTF-8")
                )
                .compact();
        LOG.debug("Generated token {}", jwt); 
        return jwt;
    }

    public boolean validate(String jwt) {
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey("secret".getBytes("UTF-8"))
                    .parseClaimsJws(jwt);
            String scope = (String) claims.getBody().get("scope");
            return scope.equals("self groups/admins");
        } catch (UnsupportedEncodingException | ExpiredJwtException e) {
            LOG.error("Token is invalid", e);
            return false;
        }
    }

}
