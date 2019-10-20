package com.example.consumingrest;

import java.util.List;

public class Images {

	private final List<String> img;

	public Images(List<String> img) {
        this.img = img;
    }

    public List<String> getImg() {
        return img;
    }
}
