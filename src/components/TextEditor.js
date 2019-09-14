import React, { useState } from "react";
import { Editor, EditorState, ContentState } from "draft-js";

export const TextEditor = () => {
  const test = ContentState.createFromText(`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed bibendum odio et felis sodales, ac ornare est sodales. Integer faucibus mi vitae arcu ornare tincidunt. Cras neque purus, pharetra et malesuada interdum, ultrices ac leo. Integer fermentum facilisis ligula, at suscipit massa sollicitudin sit amet. Maecenas blandit posuere mauris, in pharetra est faucibus et. Pellentesque elementum vestibulum gravida. Phasellus suscipit tincidunt neque, at suscipit velit rhoncus id. Ut fringilla velit ac consequat ornare. Donec pulvinar velit et libero tincidunt, quis fringilla metus faucibus.

  Aliquam lobortis, lorem suscipit suscipit malesuada, felis ante tempus odio, non malesuada turpis quam ac magna. Nullam feugiat dui non libero rhoncus, ut lobortis sem rhoncus. Suspendisse eu metus dapibus, vulputate dolor ac, imperdiet ante. Pellentesque sodales quam quis est euismod, volutpat tempus purus suscipit. Nullam et quam congue, ultrices urna at, sodales ex. Nunc molestie est sit amet magna varius vehicula. Sed tincidunt dui a ornare bibendum. Aliquam ut volutpat metus, id tincidunt lectus. Nulla pharetra mauris sapien, eget semper sapien malesuada efficitur. Proin maximus libero at sapien elementum, sit amet commodo sapien suscipit. Nam mollis nisi enim, a sodales nisi suscipit vel.
  
  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam ac diam ultrices, convallis dolor et, commodo ligula. In vulputate sem ac arcu mattis mattis. Nullam rhoncus consectetur sapien vel scelerisque. Quisque tellus est, viverra ut nisl in, aliquam dictum orci. Sed feugiat cursus placerat. Curabitur pellentesque quam ut sem feugiat, at condimentum leo faucibus. Aliquam malesuada accumsan orci non convallis. Duis finibus vulputate nisl vitae volutpat. Sed scelerisque malesuada purus.
  
  Vivamus est libero, euismod ac magna convallis, fermentum pellentesque lacus. Maecenas nunc est, tempor sit amet tortor a, fermentum tristique ante. Aenean suscipit scelerisque ligula, at posuere felis laoreet vel. Vestibulum ipsum erat, laoreet sit amet rhoncus sit amet, lobortis ut felis. Sed scelerisque ante metus, vitae maximus felis ultrices nec. Phasellus dictum pretium massa, id imperdiet felis viverra a. In tristique ipsum ex, ut vehicula sem bibendum et. Aenean pellentesque lacus sit amet velit euismod pharetra. Quisque faucibus erat orci, at blandit arcu placerat id. Vivamus dictum est in aliquam condimentum. In hac habitasse platea dictumst. Morbi lobortis eu mauris eget ornare. Quisque a venenatis neque. Duis fringilla in erat eu blandit. Morbi ornare tempus velit, eget sodales tortor dictum vel. Nam sit amet mauris suscipit, interdum orci et, elementum sem.
  
  Suspendisse potenti. Cras at rutrum metus, et consectetur est. Vestibulum ultricies lobortis ipsum non tempus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam posuere diam purus, sit amet vestibulum nisl fermentum ut. Sed in dui at ligula iaculis tincidunt. Fusce sem quam, cursus sed eros eu, dignissim mollis odio. Mauris convallis odio nec urna tincidunt, non mollis ante rhoncus. Etiam porta auctor lacinia. Pellentesque faucibus nisi ac ligula luctus vehicula. Vestibulum porta vestibulum orci vitae blandit.`);
  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(test)
  );
  const onChange = state => {
    setEditorState(state);
  };
  return <Editor editorState={editorState} onChange={onChange} />;
};
