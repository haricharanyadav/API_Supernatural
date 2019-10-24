package com.example.consumingrest;
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.concurrent.atomic.AtomicLong;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Controller {

    private static final String template = "Hello, %s!";
    private final AtomicLong counter = new AtomicLong();

    @RequestMapping(method = RequestMethod.GET, value = "/")
    public String welcome() {
        StringBuilder contentBuilder = new StringBuilder();
        try {
            BufferedReader in = new BufferedReader(new FileReader("src/main/resources/index.html"));
            String str;
            while ((str = in.readLine()) != null) {
                contentBuilder.append(str);
            }
            in.close();
        } catch (IOException e) {
        }
        String content = contentBuilder.toString();
            return 	content;
        }

    @RequestMapping(method = RequestMethod.GET, value = "/index.js")
    public String js() {
        StringBuilder contentBuilder = new StringBuilder();
        try {
            BufferedReader in = new BufferedReader(new FileReader("src/main/resources/index.js"));
            String str;
            while ((str = in.readLine()) != null) {
                contentBuilder.append(str);
            }
            in.close();
        } catch (IOException e) {
        }
        String content = contentBuilder.toString();
            return 	content;
        }

    @RequestMapping(method = RequestMethod.GET, value = "/index.css")
    public String css() {
        StringBuilder contentBuilder = new StringBuilder();
        try {
            BufferedReader in = new BufferedReader(new FileReader("src/main/resources/index.css"));
            String str;
            while ((str = in.readLine()) != null) {
                contentBuilder.append(str);
            }
            in.close();
        } catch (IOException e) {
        }
        String content = contentBuilder.toString();
            return 	content;
        }

    @RequestMapping("/greeting")
    public Greeting greeting(@RequestParam(value="name", defaultValue="World") String name) {
        return new Greeting(counter.incrementAndGet(),
                            String.format(template, name));
    }

    @RequestMapping("/seasons")
    public String seasons(HttpServletResponse response, @RequestParam(value="supernatural", defaultValue="season1") String name) {
    	Cookie cookie = new Cookie("season", name);
    	cookie.setMaxAge(30);
        response.addCookie(cookie);
        StringBuilder contentBuilder = new StringBuilder();
        try {
            BufferedReader in = new BufferedReader(new FileReader("src/main/resources/second.html"));
            String str;
            while ((str = in.readLine()) != null) {
                contentBuilder.append(str);
            }
            in.close();
        } catch (IOException e) {
        }
        String content = contentBuilder.toString();
            return 	content;
    }

    @RequestMapping("/images")
    public Images images(HttpServletResponse  response) {
    	 response.addHeader("Access-Control-Allow-Origin", "*");
        return new Images(new Constants().img);
    }

    @RequestMapping("/season/{season}")
    public Episodes season(@PathVariable("season") String season, HttpServletResponse  response) {
    	 response.addHeader("Access-Control-Allow-Origin", "*");
        return new Episodes(new Constants().seasons(season));
    }
    
    @RequestMapping("/{season}/{episode}")
    public String episode(@PathVariable("season") String season, @PathVariable("episode") String episode, 
    		HttpServletResponse  response) {
    	return null;
    }
    
    @RequestMapping("/episodes")
    public String episodes(HttpServletResponse response, @RequestParam(value="supernatural", defaultValue="season1") String season, 
    		 @RequestParam(value="episode", defaultValue="1") String episodeNumber) {
    	Cookie cookie = new Cookie("season", season);
    	cookie.setMaxAge(30);
        response.addCookie(cookie);
        Cookie cookie1 = new Cookie("episode", "episode"+episodeNumber);
    	cookie.setMaxAge(30);
        response.addCookie(cookie1);
        StringBuilder contentBuilder = new StringBuilder();
        try {
            BufferedReader in = new BufferedReader(new FileReader("src/main/resources/final.html"));
            String str;
            while ((str = in.readLine()) != null) {
                contentBuilder.append(str);
            }
            in.close();
        } catch (IOException e) {
        }
        String content = contentBuilder.toString();
            return 	content;
    }
}