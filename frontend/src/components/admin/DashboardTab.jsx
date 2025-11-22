import React from 'react';
import AdminImage from '../../images/admin-banner.jpg';

const technologies = [
  'Wordpress',
  'Shopify',
  'Webflow',
  'UI/UX',
  'WIX',
  'Framer'
];

export default function DashboardTab({ user }) {
  const getHoursForTechnology = (techName) => {
    if (!user || !user.purchasedPlans) {
      return 0;
    }
    return user.purchasedPlans
      .filter(plan => plan.serviceName === techName)
      .reduce((total, plan) => total + (plan.hours || 0), 0);
  };

  return (
    <div>
      <div className="banner-image">
        <img src={AdminImage} alt="BannerImage" />
      </div>
      <div className="row p-4">
        <div className="col-12">
          <h2 className="section-heading mb-4 mt-3">Remaining Hours</h2>
        </div>
        {technologies.map((tech, index) => {
          const hours = getHoursForTechnology(tech);
          const bgColor = index % 2 === 0 ? 'primary' : 'secondary';
          return (
            <div className="col-md-3 pb-4" key={tech}>
              <div className={`hours-card bg-${bgColor}-light`}>
                <div className="hours-cardbody">
                  <p className={`total-hours bg-${bgColor} text-white`}><span>{hours} <span>h</span></span> </p>
                  <h3 className={`tech-title text-${bgColor} fw-semibold font-outline h4 mb-0`}>{tech}</h3>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
