package com.weather;

import java.util.Date;
import java.util.Map;
import java.util.HashMap;

public class WeatherDataHolder {
 
	private static final Map<String,Weather> weatherMap = new HashMap<>();

 	public static final Map get() {
		return weatherMap;
	}

	public static final void save(Weather weatherRecord) {
		weatherMap.put(weatherRecord.time.toString() + weatherRecord.position.toString(), weatherRecord);
	}

	public static final String getHtmlFormattedData() {
		return getFormattedData("<br>");
	}
	
	public static final String getTextFormattedData() {
		return getFormattedData("\r\n");
	}

	private static final String getFormattedData(String lineSeparator) {
		StringBuilder sb = new StringBuilder();
		weatherMap.forEach( (k,v) -> sb.append(v.toString()).append(lineSeparator));
		return sb.toString();
	}

	
}