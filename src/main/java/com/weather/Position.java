package com.weather;

public class Position {
 
  public double latitude;
  public double longitude;
  public double elevation;
  public String location;

  @java.lang.Override
  public String toString() {
    return (Math.round(latitude * 100.0) / 100.0) + "," + (Math.round(longitude * 100.0) / 100.0) + "," + (Math.round(elevation));
  }

}