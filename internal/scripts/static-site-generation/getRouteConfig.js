import _ from 'lodash';
import React from 'react';
import { Route } from 'react-router-dom';
import config from '../../../config';
// this is created by the prepare script which must be run before this one.
import App from '../../../build/static/temp/App';

function findRouteChildren(parent) {
  const routeChildren = [];
  const children = _.get(parent, 'props.children', []);
  React.Children.forEach(children, (child) => {
    routeChildren.push(findRouteChildren(child));
    if (child.type === Route) {
      routeChildren.push(_.get(child, 'props.path'));
    }
  });
  return _.flatten(routeChildren);
}

function combineRouteData(basePaths) {
  const { allIndex, routes } = config('staticSiteGeneration');
  const { ignoredPaths, customRoutes } = routes;
  const basePathsToUse = _.filter(basePaths, basePath => !_.includes(ignoredPaths, basePath));
  const baseConfigs = _.map(basePathsToUse, (routePath) => {
    let destination;
    if (routePath === '' || routePath === '/') {
      destination = '/index.html';
    } else {
      destination = allIndex ? `${routePath}/index.html` : `${routePath}.html`;
    }
    return { source: routePath, destination };
  });
  return _.concat(baseConfigs, customRoutes);
}

export default function getRouteConfig() {
  const allRoutes = _.uniq(findRouteChildren(App()));
  // now get rid of dynamic routes and anything without a path
  const baseRoutes = _.filter(allRoutes, routePath => _.isString(routePath) && routePath.indexOf(':') === -1);
  return combineRouteData(baseRoutes);
}
