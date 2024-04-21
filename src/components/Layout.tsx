// import type * as elements from 'typed-html';
import { env } from "../env"
import { Dashboard } from "./Dashboard";
import { Home } from "./Home";

type LayoutProps = {
  title?: string;
};

export const Layout = (props: LayoutProps & elements.Children) => {
  const { title = 'analyzer' } = props;

  return (
    '<!DOCTYPE html>' +
    (
      <html lang='en'>
        <head>
          <meta charset='UTF-8' />
          <meta
            name='viewport'
            content='width=device-width, initial-scale=1.0'
          />
          <link
            rel='icon'
            type='image/x-icon'
          ></link>
          <title>{title}</title>
          <link href='/public/globals.css' rel='stylesheet' />
          <script src="https://cdn.jsdelivr.net/npm/d3@7"></script>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
          />
          <script src='/public/htmx@1.9.5.min.js'></script>
          <script src="https://unpkg.com/hyperscript.org@0.9.12"></script>
        </head>
        <body>
            <header id="header">
              <h1 id="headerTitle">Analysis Bot</h1>
            </header>
            <main>
              {props.children}
            </main>
            <footer id="footer"></footer>
        </body>
      </html>
    )
  );
};
