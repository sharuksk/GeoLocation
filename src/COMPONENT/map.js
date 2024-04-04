import './map.css'
import { Helmet } from 'react-helmet';

export default function Map() {

    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.setAttribute('src', 'https://polyfill.io/v3/polyfill.min.js?features=default', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBWWUSbZvw3k4XBYVhoGKPaqnSQ0E-DN90&callback=initMap&v=weekly&solution_channel=GMP_CCS_geocodingservice_v1');
    //     document.appendChild(script);

    //     const script1 = document.createElement('script');
    //     script1.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBWWUSbZvw3k4XBYVhoGKPaqnSQ0E-DN90&callback=initMap&v=weekly&solution_channel=GMP_CCS_geocodingservice_v1');
    //     document.appendChild(script1);
    //   }, []);
    
    // const script1 = document.createElement("script");
    // script1.src = "https://polyfill.io/v3/polyfill.min.js?features=default";
    // script1.async = true;

    // const script2 = document.createElement("script");
    // script2.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBWWUSbZvw3k4XBYVhoGKPaqnSQ0E-DN90&callback=initMap&v=weekly&solution_channel=GMP_CCS_geocodingservice_v1";
    // script2.async = true;

    let map;
    let marker;
    let geocoder;
    let responseDiv;
    let response;
    const google = window.google

    function initMap() {
      map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        center: { lat: -34.397, lng: 150.644 },
        mapTypeControl: false,
      });
      geocoder = new google.maps.Geocoder();

      const inputText = document.createElement("input");

      inputText.type = "text";
      inputText.placeholder = "Enter a location";

      const submitButton = document.createElement("input");

      submitButton.type = "button";
      submitButton.value = "Geocode";
      submitButton.classList.add("button", "button-primary");

      const clearButton = document.createElement("input");

      clearButton.type = "button";
      clearButton.value = "Clear";
      clearButton.classList.add("button", "button-secondary");
      response = document.createElement("pre");
      response.id = "response";
      response.innerText = "";
      responseDiv = document.createElement("div");
      responseDiv.id = "response-container";
      responseDiv.appendChild(response);

      const instructionsElement = document.createElement("p");

      instructionsElement.id = "instructions";
      instructionsElement.innerHTML =
        "<strong>Instructions</strong>: Enter an address in the textbox to geocode or click on the map to reverse geocode.";
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputText);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(submitButton);
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(clearButton);
      map.controls[google.maps.ControlPosition.LEFT_TOP].push(
        instructionsElement
      );
      map.controls[google.maps.ControlPosition.LEFT_TOP].push(responseDiv);
      marker = new google.maps.Marker({
        map,
      });
      map.addListener("click", (e) => {
        geocode({ location: e.latLng });
      });
      submitButton.addEventListener("click", () =>
        geocode({ address: inputText.value })
      );
      clearButton.addEventListener("click", () => {
        clear();
      });
      clear();
    }

    function clear() {
      marker.setMap(null);
    }

    function geocode(request) {
      clear();
      geocoder
        .geocode(request)
        .then((result) => {
          const { results } = result;

          map.setCenter(results[0].geometry.location);
          marker.setPosition(results[0].geometry.location);
          marker.setMap(map);
          response.innerText = JSON.stringify(result, null, 2);
          return results;
        })
        .catch((e) => {
          alert("Geocode was not successful for the following reason: " + e);
        });
    }

    window.initMap = initMap;
    return (
        <div>
            {/* <div>{document.body.appendChild(script1)}</div>
            <div>{document.body.appendChild(script2)}</div> */}
            <Helmet>
                <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBWWUSbZvw3k4XBYVhoGKPaqnSQ0E-DN90&callback=initMap&v=weekly&solution_channel=GMP_CCS_geocodingservice_v1"></script>
            </Helmet>

            <div id="map"></div>
        </div>

    )
}

    
    