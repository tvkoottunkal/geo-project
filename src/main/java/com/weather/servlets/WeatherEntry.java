package com.weather.servlets;

import com.weather.*;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.util.Date;
import java.text.SimpleDateFormat;

public class WeatherEntry extends HttpServlet {

  public void doGet(HttpServletRequest request,
                    HttpServletResponse response)
            throws ServletException, IOException
  {
    response.setContentType("text/html");
	PrintWriter out = response.getWriter();

	Position position = createPosition(request);
	Weather weather = createWeatherRecord(request);
	weather.position = position;
	WeatherDataHolder.save(weather);
	out.println(WeatherDataHolder.getHtmlFormattedData()); 
  }
  
  public void destroy()
  {
      // do nothing.
  }
  
  private Weather createWeatherRecord(HttpServletRequest request)  {
	Weather weather = new Weather();
	weather.temperature = Double.parseDouble(request.getParameter("tem"));
	weather.pressure = Double.parseDouble(request.getParameter("pre"));
	weather.humidity = Double.parseDouble(request.getParameter("hum"));
	System.out.println(request.getParameter("dat"));
	System.out.println(request.getParameter("tim"));
	try {
		weather.time = new SimpleDateFormat("yyyy-MM-dd hh:mm a").parse(request.getParameter("dat") + " " + request.getParameter("tim"));
	} catch (java.text.ParseException pEx) {
		
	}
	
	return weather;
  }
  
  private Position createPosition(HttpServletRequest request) {
	Position position = new Position();
	position.latitude = Double.parseDouble(request.getParameter("lat"));
	position.longitude = Double.parseDouble(request.getParameter("lon"));
	position.elevation = Double.parseDouble(request.getParameter("ele"));
	position.location = request.getParameter("loc");
	return position;
  }
}