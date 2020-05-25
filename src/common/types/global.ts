import { FunctionComponent } from 'react';
import { RouteComponentProps as BasicRouteProps, RouteProps, match } from 'react-router-dom';

export interface MyRouteProps extends RouteProps {
  isMenu?: boolean;
}

export type PFC<P = {}> = FunctionComponent<P> & {
  title?: string;
  authority?: string | string[];
};

type IncludeRoute = 'component' | 'exact' | 'path';

type RouteType = Pick<RouteProps, IncludeRoute>;

export interface RouterTypes<T extends Record<string, any> = {}, P = {}> extends BasicRouteProps {
  computedMatch?: match<P>;
  route?: RouteType & T;
}
