// import type * as elements from 'typed-html';
import { env } from "../env"

type HomeProps = {
};

export const Home = (props: HomeProps & elements.Children) => {
  return (
      <>
        <section id="introSection">
          <p style="text-align: center;">Bot to scrape, profile and categorize users based on NLP from  chat messages. Used for team building, identifying positive / negative influences, trends over time, and other potential analytic uses.</p>
        </section>
        <section>
          <button id="inviteButton">
            <a href={`${env.BOT_INVITE_LINK}`}>Invite</a> 
          </button>
        </section>
      </>
  );
};
