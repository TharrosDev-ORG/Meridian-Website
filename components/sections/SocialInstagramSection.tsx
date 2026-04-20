"use client";

import React from 'react';
import Magnetic from '@/components/Magnetic';
import { INSTAGRAM_URL } from '@/utils/social';

const SocialInstagramSection: React.FC = () => {
  return (
    <section className="social-record-sec" aria-labelledby="social-record-heading">
      <div className="wrap social-record-inner">
        <div className="social-record-eyebrow rv">Digital Record</div>
        <h2 className="social-record-title rv" id="social-record-heading" data-d="1">
          The Society on <em>Instagram.</em>
        </h2>
        <p className="social-record-copy rv" data-d="2">
          Real-time announcements and priority registration.
        </p>
        <div className="social-record-actions rv" data-d="3">
          <Magnetic strength={0.2}>
            <a 
              href={INSTAGRAM_URL} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary"
            >
              <span>Follow @Meridian.Society</span>
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default SocialInstagramSection;
