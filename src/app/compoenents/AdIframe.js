const AdIframe = () => (
  <div style={{ position: "relative", width: "160px", height: "600px" }}>
    <iframe
      src="https://publisher.linkvertise.com/cdn/ads/LV-160x600/index.html"
      frameBorder="0"
      height="600"
      width="160"
      style={{ border: "none" }}
    ></iframe>
    <a
      href="https://publisher.linkvertise.com/ac/1232006"
      target="_blank"
      style={{
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
      rel="noopener noreferrer"
    ></a>
  </div>
);

export default AdIframe;
