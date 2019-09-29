import React, { useState, useEffect, ChangeEventHandler } from "react";

export const goto = (url: string) => {
  window.history.replaceState({}, url, `/${url}`);
};
