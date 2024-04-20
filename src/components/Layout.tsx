// import type * as elements from 'typed-html';
import { env } from "../env"

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
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css"
          />
          <script src='/public/htmx@1.9.5.min.js'></script>
        </head>
        <body>
            <header id="header">
              <h1 id="headerTitle">Analysis Bot</h1>
            </header>
            <main>
              <button id="inviteButton">
                <a href={`${env.BOT_INVITE_LINK}`}>Invite</a> 
              </button>
            </main>
            <footer id="footer"></footer>
        </body>
      </html>
    )
  );
};
