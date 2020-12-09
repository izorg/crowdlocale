/* eslint-disable react/prop-types */
import { Typography } from "antd";
import type { LinkProps as AntDesignLinkProps } from "antd/es/typography/Link";
import { createPath } from "history";
import { forwardRef, MouseEvent } from "react";
import {
  LinkProps as ReactRouterLinkProps,
  useHref,
  useLocation,
  useNavigate,
  useResolvedPath,
} from "react-router-dom";

function isModifiedEvent(event: MouseEvent) {
  return event.metaKey || event.altKey || event.ctrlKey || event.shiftKey;
}

const Link = forwardRef<
  HTMLAnchorElement,
  ReactRouterLinkProps & AntDesignLinkProps
>(
  (
    { onClick, replace: replaceProp = false, state, target, to, ...rest },
    ref
  ) => {
    const href = useHref(to);
    const navigate = useNavigate();
    const location = useLocation();
    const path = useResolvedPath(to);

    function handleClick(event: MouseEvent<HTMLAnchorElement>) {
      if (onClick) onClick(event);
      if (
        !event.defaultPrevented && // onClick prevented default
        event.button === 0 && // Ignore everything but left clicks
        (!target || target === "_self") && // Let browser handle "target=_blank" etc.
        !isModifiedEvent(event) // Ignore clicks with modifier keys
      ) {
        event.preventDefault();

        // If the URL hasn't changed, a regular <a> will do a replace instead of
        // a push, so do the same here.
        const replace =
          !!replaceProp || createPath(location) === createPath(path);

        navigate(to, { replace, state });
      }
    }

    return (
      <Typography.Link
        {...rest}
        ref={ref}
        href={href}
        onClick={handleClick}
        target={target}
      />
    );
  }
);

Link.displayName = "Link";

export default Link;
