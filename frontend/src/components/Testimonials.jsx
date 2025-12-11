import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          "https://api.hn9codecraft.com/api.php?resource=testimonial"
        );

        // Check your API structure
        console.log("Testimonials API:", response.data);

        // If API returns { status: "success", data: [...] } then use response.data.data
        const data = Array.isArray(response.data)
          ? response.data
          : response.data.data || [];

        setTestimonials(data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading testimonials...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="section-spacing bg-lighter">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-semibold text-primary heading-center text-center">
            Testimonies
          </h2>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          spaceBetween={30}
          slidesPerView={3}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.length > 0 ? (
            testimonials.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="card shadow-sm border-0 bg-primary text-white p-4 h-100 rounded-3">
                  <div className="d-flex align-items-center mb-4">
                    <img
                      src={item.image || "https://via.placeholder.com/80"}
                      alt={item.name || "User"}
                      className="rounded-circle me-3"
                      width="60"
                      height="60"
                    />
                    <div>
                      <h3 className="mb-0 text-secondary fw-semibold">
                        {item.name}
                      </h3>
                      <p className="mb-0">{item.role}</p>
                    </div>
                  </div>
                  <p className="card-text text-white">{item.text}</p>
                </div>
              </SwiperSlide>
            ))
          ) : (
            <p className="text-center text-muted">
              No testimonials available right now.
            </p>
          )}
        </Swiper>
      </div>
    </div>
  );
}
