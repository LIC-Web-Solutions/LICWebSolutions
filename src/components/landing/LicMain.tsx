import { LicMainServices } from "./LicMainServices";

export function LicMain() {
  return (
    <main>
      <div className="main__container">
        <div className="main__header">
          <div className="main__left">
            <div className="main__left--container">
              <h1 className="main__left--h1">
                Are you ready to elevate your brand? We are.
              </h1>
              <p className="main__left--p">
                Take control of your digital future in a way that reflects your
                vision with innovative, user-centered design and development
                solutions. Since 2022, our agency has been a local leader in
                creating exceptional digital experiences for Long Island City
                businesses, including profitable websites and applications
                across industries.
              </p>
              <div className="main__booking">
                <a href="#"> Find out what makes LICWS special</a>
              </div>
            </div>
          </div>

          <div className="main__right">
            <LicMainServices />
          </div>
        </div>

        <div className="main__approach">
          <div className="approach__left">
            <div className="approach__left--container">
              <h1 className="approach__left--h1">
                A strategic approach guides us
              </h1>
              <p className="approach__left--p">
                Our strategies and services strive to deliver results and build
                long-term, successful partnerships with innovative digital
                solutions.
              </p>
              <div className="hero__booking">
                <a href="#"> Learn more about our unique approach</a>
              </div>
            </div>
          </div>

          <div className="approach__right" />
        </div>
      </div>
    </main>
  );
}
