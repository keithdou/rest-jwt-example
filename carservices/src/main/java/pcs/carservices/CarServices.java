package pcs.carservices;

import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *
 * @author keith
 */
@Path("/")
public class CarServices {

    private static final Logger LOG = LoggerFactory.getLogger(CarServices.class);

    @Inject
    TokenHandler tokenHandler;

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/listCars")
    public Response listCars(@Context HttpServletRequest request, @Context HttpServletResponse response) {

        LOG.debug("listCars starts");
        
        String authorisation = request.getHeader("Authorization");
        LOG.debug("authorisation={}",authorisation);
       
        if (authorisation == null) {
           return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        
        String token = authorisation.replace("Bearer", "").trim();

        boolean validToken = false;
        
        try {
            validToken = tokenHandler.validate(token);
            LOG.debug("validToken={}", validToken);
        } catch (Exception e) {
            LOG.debug("Unable to validate token", e);
        }
        
        if (!validToken) {
            LOG.debug("Return unauthorised");
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }

        List<Car> carList = new ArrayList<Car>();

        Car car = new Car();
        car.setBrand("Honda");
        car.setYear("2018");
        car.setColor("red");
        car.setPrice("$20,000");
        car.setSaleDate("01/01/2010");
        car.setVin("12345678901234567");
        carList.add(car);
        
        car = new Car();
        car.setBrand("Mazda");
        car.setYear("2012");
        car.setColor("grey");
        car.setPrice("$30,000");
        car.setSaleDate("01/01/2014");
        car.setVin("111145678901234567");
        carList.add(car);

        return Response.ok().entity(carList).build();
    }
    
    @POST
    @Produces({MediaType.APPLICATION_JSON})
    @Path("/login/{userid}")
    public Response authenticate(@PathParam("userid") String userId,
                                 @Context HttpServletRequest request, @Context HttpServletResponse response) {
        
        LOG.debug("authenticate starts for {}",userId);
        
        String authorisation = request.getHeader("Authorization");
        LOG.debug("authorisation={}",authorisation);
        
        if (authorisation == null) {
            LOG.debug("No authorisation header found");
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        
        String usernamePassword = new String(Base64.getDecoder().decode(authorisation.replace("Basic", "").trim()));
        LOG.debug("usernamePassword={}",usernamePassword);
        String password = usernamePassword.split(":")[1];
        LOG.debug("password={}",password);
        
        // TODO validate userid / password against some db
        
        Token token = new Token();
        try {
            token.setToken(tokenHandler.generate());
        } catch (Exception e) {
            LOG.error("Authenticate failure",e);
            return Response.status(Response.Status.UNAUTHORIZED).build();
        }
        
        return Response.ok().entity(token).build();
    }

}
