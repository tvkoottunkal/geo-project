package com.weather;

import java.util.Date;
import java.text.DateFormat;
import java.text.SimpleDateFormat;

public class Weather {
 
	public Date time;
	public Position position;
	public String condition;
	public double temperature;
	public double pressure;
	public double humidity;
	
  @java.lang.Override
  public java.lang.String toString() {
    return position.location + 
	"|" + position + 
	"|" + new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(time) + 
	"|" + condition + 
	"|" + (temperature > 0 ? "+" : "") +  temperature + 
	"|" + pressure + 
	"|" + humidity;
  }

}