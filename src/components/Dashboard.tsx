// import type * as elements from 'typed-html';
import { env } from "../env"

type DashboardProps = {
};

export const Dashboard = (props: DashboardProps & elements.Children) => {
  return (
    (
      <>
        <script src="public/Dashboard.js"></script>
        <script type="text/hyperscript">
            on load from window
            fetch users
            then put it into users
            then call renderGraph(users)
        </script>

        <section>
          <svg width="600" height='600'></svg>
        </section>
      </>
    )
  );
};
