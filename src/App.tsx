import React, { useState } from "react";
import "./App.css";
import { SideBar } from "./sidebar-navigator";
import { MainContent } from "./main-content-view";
import { TOPIC_SCREENS } from "./routers/TopicRouter";

const topics = [
  {
    name: "OSI Model",
    date: "12th March 2019",
    content:
      "The Open Systems Interconnection model (OSI model) is a conceptual model that characterizes and standardizes the communication functions of a telecommunication or computing system without regard to its underlying internal structure and technology. Its goal is the interoperability of diverse communication systems with standard communication protocols. The model partitions a communication system into abstraction layers. The original version of the model defined seven layers.A layer serves the layer above it and is served by the layer below it. For example, a layer that provides error-free communications across a network provides the path needed by applications above it, while it calls the next lower layer to send and receive packets that constitute the contents of that path. Two instances at the same layer are visualized as connected by a horizontal connection in that layer."
  },
  {
    name: "Carl Jung | Dreams",
    date: "13th Febuary 2019",
    content:
      "A psychoanalyst based in Zurich, Switzerland, Jung (1875  -1961) was a friend and follower of Freud but soon developed his own ideas about how dreams are formed.  While depth psychology has fallen out of favor in neuroscience, Jung’s ideas are still thriving in contemporary psychoanalytic circles.  Popular applications directly based on Jung’s research include the Myers-Briggs Personality Type Indicator, the polygraph (lie detector) test, and 12-step addiction recovery programs. The basic idea behind Jungian dream theory is that dreams reveal more than they conceal. They are a natural expression of our imagination and use the most straightforward language at our disposal: mythic narratives.  Because Jung rejected Freud’s theory of dream interpretation that dreams are designed to be secretive, he also did not believe dream formation is a product of  discharging our tabooed sexual impulses."
  },
  {
    name: "Rust procedural macros",
    date: "12th July 2018",
    content: `First defined over two years ago in RFC 1566, procedural macros are, in layman's terms, a function that takes a piece of syntax at compile time and produces a new bit of syntax. Procedural macros in Rust 2018 come in one of three flavors: #[derive] mode macros have actually been stable since Rust 1.15 and bring all the goodness and ease of use of #[derive(Debug)] to user-defined traits as well, such as Serde's #[derive(Deserialize)].
    
    Function-like macros are newly stable to the 2018 edition and allow defining macros like env!('FOO') or format_args!("...") in a crates.io-based library. You can think of these as sort of "macro_rules! macros" on steroids.
    
    Attribute macros, my favorite, are also new in the 2018 edition and allow you to provide lightweight annotations on Rust functions which perform syntactical transformations over the code at compile time.`
  },
  {
    name: "React Effect Hook",
    date: "12th June 2018",
    content: `You’ve likely performed data fetching, subscriptions, or manually changing the DOM from React components before. We call these operations “side effects” (or “effects” for short) because they can affect other components and can’t be done during rendering.

    The Effect Hook, useEffect, adds the ability to perform side effects from a function component. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes, but unified into a single API. (We’ll show examples comparing useEffect to these methods in Using the Effect Hook.)`
  }
];

const App: React.FC = () => {
  const [screen, setScreen] = useState(TOPIC_SCREENS.MY_NOTES);
  const [data, setData] = useState(topics[0]);

  const navigate = (screen: TOPIC_SCREENS, data: any) => {
    setScreen(screen);
    setData(data);
  };

  return (
    <div className="App">
      <SideBar navigate={navigate} screen={screen} />
      <MainContent
        screen={screen}
        title={data.name}
        data={data}
        navigate={navigate}
      />
    </div>
  );
};

export default App;
