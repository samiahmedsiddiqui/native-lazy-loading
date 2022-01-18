declare type compatibility = boolean | undefined;

declare type options = {
  defaultValue?: string;
  auto?: [];
  lazy?: [];
  eager?: [];
};

declare type treeOptions = {
  defaultValue: string;
  auto?: string[];
  lazy?: string[];
  eager?: string[];
};

declare type library = {
  class?: string;
  newSrc?: string;
  notAllowed?: [];
};

declare function nativeLazyLoading(html: string, options?: options, compatibility?: compatibility, library?: library): string;

export { compatibility, options, treeOptions, library, nativeLazyLoading };
