package com.example.consumingrest;

import java.util.List;

public class Episodes {

	private final List<String> episodes;

	public Episodes(List<String> episodes) {
        this.episodes = episodes;
    }

    public List<String> getEpisodes() {
        return episodes;
    }
}
