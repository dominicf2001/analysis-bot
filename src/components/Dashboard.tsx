// import type * as elements from 'typed-html';
import { env } from "../env"

type DashboardProps = {
};

export const Dashboard = (props: DashboardProps & elements.Children) => {
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
            <section _="
                      on load from window
                      fetch 'users'
                      then call renderServerGraph(it)">
              <svg id="serverGraph" width="1000" height="600"></svg>
            </section>
          </div>

          <div id="usersView" class="grid">
            <section>
              <table 
                  id="userTable" _="
                    on load from window
                    fetch 'users'
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
