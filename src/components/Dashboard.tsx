// import type * as elements from 'typed-html';
import { env } from "../env"

type DashboardProps = {
  user_id: string;
};

export const Dashboard = (props: DashboardProps & elements.Children) => {
  const userId = props.user_id;

  return (
    (
      <>
        <div id="userId"></div>
        <script src="public/Dashboard.js"></script>
        <script data-user-id={userId} type="text/hyperscript">
            on load from window
            set userId to my [@data-userId]
            fetch `user/${userId}`
            then put it into user
            then call renderGraph(user)
        </script>

        <section>
          <svg width="600" height='600'></svg>
        </section>
      </>
    )
  );
};
