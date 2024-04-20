import type * as elements from 'typed-html';

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
          <script src='/public/htmx@1.9.5.min.js'></script>
        </head>
        <body>
            <a href=""></a> 
        </body>
      </html>
    )
  );
};
