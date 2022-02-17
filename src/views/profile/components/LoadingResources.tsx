import React from "react";
import { LoadingCard } from "../../../components";
import LoadingSnippet from "../../../components/LoadingSnippet";
import { LoadingVideo } from "../../../components/LoadingVideo";

const LoadingResources = ({ selectedResourceType }) => {
  switch (selectedResourceType) {
    case "NOTES": {
      return <LoadingCard />;
    }
    case "SNIPPETS": {
      return <LoadingSnippet />;
    }
    case "VIDEOS": {
      return <LoadingVideo />;
    }
    case "LINKS": {
      return <LoadingCard />;
    }
    default: {
      return null;
    }
  }
};

export default LoadingResources;
