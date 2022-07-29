import React, { useEffect, useRef, useState } from "react";
import { createUseStyles } from "react-jss";
import { findByTitle } from "../../clib/api";
import { goto } from "../../util";
import marked from "marked";
import ResultTypeIcon from "../../components/ResultTypeIcon";
import ClickAwayListener from "../../components/ClickAwayListener";

const useStyles = createUseStyles({
  searchBar: {
    padding: 3,
    width: "100%",
    color: "white",
    boxShadow: "2px 2px 1px 0px rgba(0, 0, 0, 0.75)",
    backgroundColor: "#333",
    border: "1px solid gray",
    borderRadius: 5,
    marginTop: 10,
    fontSize: 14,
    "&:focus": {
      outline: "none",
      border: "1px solid white",
    },
  },
  searchBarFocused: {
    padding: 3,
    width: "100%",
    color: "white",
    boxShadow: "2px 2px 1px 0px rgba(0, 0, 0, 0.75)",
    backgroundColor: "#333",
    border: "1px solid white",
    borderRadius: "5px 5px 0px 0px",
    marginTop: 10,
    fontSize: 14,
    "&:focus": {
      outline: "none",
    },
  },
  searchModal: {
    position: "absolute",
    width: "100%",
    height: 300,
    zIndex: 500,
    margin: "auto",
    backgroundColor: "#333",
    borderLeft: "1px solid white",
    borderRight: "1px solid white",
    borderBottom: "1px solid white",
    borderRadius: "0px 0px 10px 10px",
    overflow: "auto",
  },
  videoResult: {
    width: "100%",
    padding: 10,
    fontSize: 14,
    borderBottom: "1px solid #1f1f1f",
    color: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#246bf8",
    },
    display: "flex",
    flexDirection: "row",
  },
  result: {
    width: "100%",
    padding: 15,
    borderBottom: "1px solid #1f1f1f",
    color: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#246bf8",
    },
    display: "flex",
    flexDirection: "row",
  },
  videoResultTitle: {
    paddingTop: 10,
    flex: 10,
  },
  snippetResult: {
    width: "100%",
    padding: 15,
    borderBottom: "1px solid #1f1f1f",
    color: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#246bf8",
    },
  },
  snippetResultTitle: {
    flex: 1,
  },
  snippetResultText: {
    "& h1, h2, h3, h4": {
      fontSize: 15,
    },
    fontSize: 12,
    "& a:visited": {
      color: "white",
    },
  },
  resultTitle: {
    flex: 10,
  },
  resultType: {
    flex: 1,
  },
  snippetResultType: {
    flex: 1,
  },
  videoResultImage: {
    flex: 3,
  },
  linkResult: {
    width: "100%",
    padding: 10,
    borderBottom: "1px solid #1f1f1f",
    color: "white",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#246bf8",
    },
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  linkResultImage: {
    flex: 1,
  },
  linkResultTitle: {
    flex: 9,
  },
  resultLoading: {
    padding: "20px 10px",
    borderBottom: "1px solid black",
  },
  resultLoadingTitle: {
    background: "gray",
    height: 15,
    borderRadius: 10,
    width: "50%",
  },
});

const VideoResult = ({ result, reset }) => {
  const classes = useStyles();

  const onSelectResult = (url) => {
    goto(
      `/topic/${result.topic_id}/${result.result_type}s/${result.resource_id}`
    );
    reset();
  };

  return (
    <div className={classes.videoResult} onClick={onSelectResult}>
      <div className={classes.videoResultImage}>
        <img src={result.misc2} width="80px" style={{ borderRadius: 4 }} />
      </div>
      <div className={classes.videoResultTitle}>{result.title}</div>
    </div>
  );
};

const LinkResult = ({ onSelectResult, result, reset }) => {
  const classes = useStyles();
  return (
    <div className={classes.linkResult} onClick={onSelectResult}>
      <div className={classes.linkResultImage}>
        <img
          src={result.misc2}
          height="25px"
          width="25px"
          style={{ borderRadius: 4 }}
        />
      </div>

      <div className={classes.linkResultTitle}>{result.title}</div>
    </div>
  );
};

const SnippetResult = ({ result, reset }) => {
  const classes = useStyles();

  const onSelectResult = () => {
    goto(`/topic/${result.topic_id}/${result.result_type}s`);
    reset();
  };

  return (
    <div onClick={onSelectResult}>
      <div className={classes.snippetResult}>
        <div style={{ flexDirection: "row", display: "flex" }}>
          <div className={classes.resultType}>
            <ResultTypeIcon type={result.result_type} />
          </div>
          <div className={classes.resultTitle}>{result.misc2}</div>
        </div>
        <div
          className={classes.snippetResultText}
          dangerouslySetInnerHTML={{ __html: marked(result.title) }}
        ></div>
      </div>
    </div>
  );
};

const SearchResult = ({ result, reset }) => {
  const classes = useStyles();

  const onSelectResult = (url) => {
    if (result.result_type === "topic") {
      goto(`/topic/${result.topic_id}/notes`);
    } else if (result.result_type === "snippet") {
      goto(`/topic/${result.topic_id}/${result.result_type}s`);
    } else if (result.result_type === "link") {
      window.open(result.misc, "blank");
    } else {
      goto(
        `/topic/${result.topic_id}/${result.result_type}s/${result.resource_id}`
      );
    }
    reset();
  };

  return (
    <div className={classes.result} onClick={onSelectResult}>
      <div className={classes.resultType}>
        <ResultTypeIcon type={result.result_type} />
      </div>
      <div className={classes.resultTitle}>{result.title}</div>
    </div>
  );
};

const ResultLoading = () => {
  const classses = useStyles();
  return (
    <div className={classses.resultLoading}>
      <div className={classses.resultLoadingTitle}></div>
    </div>
  );
};

const SearchModal = ({ results, loading, reset }) => {
  const classes = useStyles();

  return (
    <div className={classes.searchModal}>
      {!loading &&
        results &&
        results.map((result) => {
          if (result.result_type === "video") {
            return <VideoResult result={result} reset={reset} />;
          } else if (result.result_type === "link") {
            return (
              <LinkResult
                result={result}
                reset={reset}
                onSelectResult={() => {
                  window.open(result.misc, "blank");
                }}
              />
            );
          } else if (result.result_type === "snippet") {
            return <SnippetResult result={result} reset={reset} />;
          } else {
            return <SearchResult result={result} reset={reset} />;
          }
        })}
      {loading && (
        <div>
          <ResultLoading />
          <ResultLoading />
          <ResultLoading />
        </div>
      )}
    </div>
  );
};

let searchTimeOut;

export const SearchBar = () => {
  const classes = useStyles();
  const [query, setQuery] = useState();
  const [results, setResults] = useState();
  const [loading, setLoading] = useState(false);
  const queryRef = useRef();
  const searchFieldRef = useRef();

  useEffect(() => {
    window.addEventListener("keydown", searchCommandListener);
    return () => {
      window.removeEventListener("keydown", searchCommandListener);
    };
  }, []);

  const searchCommandListener = (event) => {
    if (event.ctrlKey && event.key === "s") {
      // @ts-ignore
      searchFieldRef.current.focus();
    }
  };

  const _setQuery = (term) => {
    setQuery(term);
    queryRef.current = term;
  };

  const handleFound = (data) => {
    setResults(data);
    setLoading(false);
  };

  const handleErr = (err) => {
    setLoading(false);
  };

  const onChangeQuery = (evt) => {
    _setQuery(evt.target.value);
    clearTimeout(searchTimeOut);
    setLoading(true);
    searchTimeOut = setTimeout(() => {
      findByTitle(queryRef.current).then(handleFound).catch(handleErr);
    }, 500);
  };

  const reset = () => {
    setResults(null);
    _setQuery("");
  };

  return (
    <ClickAwayListener onClickAway={reset}>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search All"
          ref={searchFieldRef}
          value={query}
          className={query ? classes.searchBarFocused : classes.searchBar}
          onChange={onChangeQuery}
        ></input>
        {query && (
          <SearchModal results={results} loading={loading} reset={reset} />
        )}
      </div>
    </ClickAwayListener>
  );
};
