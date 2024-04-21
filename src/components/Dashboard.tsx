// import type * as elements from 'typed-html';
import { env } from "../env"

type DashboardProps = {
  serverId: string;
};

export const Dashboard = (props: DashboardProps & elements.Children) => {
  const serverId = props.serverId;
  return (
    (
      <>
        <script src="public/Dashboard.js"></script>
        <script type="text/hyperscript"></script>

        <div>
          <div id="viewButtonContainer" role="group">
            <button onclick="renderUsersView()"  class="viewButton selected" id="usersViewButton">Users</button>
            <button onclick="renderServerView()" class="viewButton" id="serverViewButton">Server</button>
          </div>
        </div>

        <section>
          <div style="display: none;" id="serverView">
            <section data-server_id={serverId} _="
                      on load from window
                      set serverId to my [@data-serverId]
                      fetch `users/${serverId}`
                      then call renderServerGraph(it)">
              <svg id="serverGraph" width="1000" height="600"></svg>
            </section>
          </div>

          <div id="usersView" class="grid">
            <section>
              <table 
                  data-server_id={props.serverId}
                  id="userTable" _="
                    on load from window
                    set serverId to my [@data-serverId]
                    fetch `users/${serverId}`
                    then call populateUsersTable(it)">
                <thead>
                  <tr>
                    <th scope="col">User</th>
                  </tr>
                </thead>
                <tbody id="tableBody">
                </tbody>
              </table>
            </section>

            <section id="userGraphSection">
              <svg id="userGraph" width="600" height="600"></svg>
            </section>
        </div>
      </section>
      </>
    )
  );
};
