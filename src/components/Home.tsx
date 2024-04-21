// import type * as elements from 'typed-html';
import { env } from "../env"

type HomeProps = {
};

export const Home = (props: HomeProps & elements.Children) => {
  return (
      <>
        <section id="introSection">
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
        </section>
        <section>
          <button id="inviteButton">
            <a href={`${env.BOT_INVITE_LINK}`}>Invite</a> 
          </button>
        </section>
      </>
  );
};
