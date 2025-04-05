import { FormEvent, useState } from "react";
import { Loader } from "@aws-amplify/ui-react";
import "./App.css";
import { Amplify } from "aws-amplify";
import { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";


import "@aws-amplify/ui-react/styles.css";

// Log Amplify configuration
console.log('Configuring Amplify with outputs:', outputs);
Amplify.configure(outputs);

const amplifyClient = generateClient<Schema>({
  authMode: "userPool",
});

function App() {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    console.log('Form submission started');

    try {
      const formData = new FormData(event.currentTarget);
      const formDataObj = Object.fromEntries(formData);
      console.log('Form data:', formDataObj);
      
      // Collect all form data
      const track = formData.get("track")?.toString().trim() || null;
      const laps = formData.get("laps")?.toString().trim() || null;
      const pit = formData.get("pit")?.toString().trim() || null;
      const notes = formData.get("notes")?.toString().trim() || null;
      const tyreLifeSoft = formData.get("tyreLifeSoft")?.toString().trim() || null;
      const lapTimeSoft = formData.get("lapTimeSoft")?.toString().trim() || null;
      const notesSoft = formData.get("notesSoft")?.toString().trim() || null;
      const tyreLifeMedium = formData.get("tyreLifeMedium")?.toString().trim() || null;
      const lapTimeMedium = formData.get("lapTimeMedium")?.toString().trim() || null;
      const notesMedium = formData.get("notesMedium")?.toString().trim() || null;
      const tyreLifeHard = formData.get("tyreLifeHard")?.toString().trim() || null;
      const lapTimeHard = formData.get("lapTimeHard")?.toString().trim() || null;
      const notesHard = formData.get("notesHard")?.toString().trim() || null;
            
      const { data, errors } = await amplifyClient.queries.askBedrock({
        strat: [track, laps, pit, notes, tyreLifeSoft, lapTimeSoft, notesSoft, tyreLifeMedium, lapTimeMedium, notesMedium, tyreLifeHard, lapTimeHard, notesHard] 
      });
      console.log('API response:', { data, errors });

      if (!errors) {
        console.log('Setting result:', data?.body);
        setResult(data?.body || "No data returned");
      } else {
        console.error('API errors:', errors);
        setResult("An error occurred while processing your request");
      }

    } catch (e) {
      console.error('Form submission error:', e);
      setResult("An error occurred while submitting the form");
    } finally {
      console.log('Form submission completed');
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <div className="header-container">
        <h1 className="main-header">
          Royall Race Strat Generator
        </h1>
      </div>
      <form onSubmit={onSubmit} className="form-container">
        <div className="search-container">
        <label htmlFor="track">Track: <span style={{ color: 'red' }}>*</span></label>          <select
            className="wide-input"
            id="track"
            name="track"
            required
          >
            <option value="">Select a Track</option>
            <option value="Australia - Albert Park Circuit">Australia - Albert Park Circuit</option>
            <option value="Austria - Red Bull Ring">Austria - Red Bull Ring</option>
            <option value="Azerbaijan - Baku City Circuit">Azerbaijan - Baku City Circuit</option>
            <option value="Bahrain - Bahrain International Circuit">Bahrain - Bahrain International Circuit</option>
            <option value="Belgium - Circuit de Spa-Francorchamps">Belgium - Circuit de Spa-Francorchamps</option>
            <option value="Brazil - Interlagos Circuit">Brazil - Interlagos Circuit</option>
            <option value="Canada - Circuit Gilles Villeneuve">Canada - Circuit Gilles Villeneuve</option>
            <option value="China - Shanghai International Circuit">China - Shanghai International Circuit</option>
            <option value="Hungary - Hungaroring">Hungary - Hungaroring</option>
            <option value="Italy - Emilia Romagna Grand Prix">Italy - Emilia Romagna Grand Prix</option>
            <option value="Italy - Monza Circuit">Italy - Monza Circuit</option>
            <option value="Japan - Suzuka Circuit">Japan - Suzuka Circuit</option>
            <option value="Mexico - Autódromo Hermanos Rodríguez">Mexico - Autódromo Hermanos Rodríguez</option>
            <option value="Monaco - Circuit de Monaco">Monaco - Circuit de Monaco</option>
            <option value="Netherlands - Circuit Zandvoort">Netherlands - Circuit Zandvoort</option>
            <option value="Qatar - Lusail International Circuit">Qatar - Lusail International Circuit</option>
            <option value="Saudi Arabia - Jeddah Corniche Circuit">Saudi Arabia - Jeddah Corniche Circuit</option>
            <option value="Singapore - Marina Bay Street Circuit">Singapore - Marina Bay Street Circuit</option>
            <option value="Spain - Circuit de Barcelona-Catalunya">Spain - Circuit de Barcelona-Catalunya</option>
            <option value="UAE - Yas Marina Circuit">UAE - Yas Marina Circuit</option>
            <option value="UK - Silverstone Circuit">UK - Silverstone Circuit</option>
            <option value="USA Austin - Circuit of the Americas">USA Austin - Circuit of the Americas</option>
            <option value="USA Miami - Miami International Autodrome">USA Miami - Miami International Autodrome</option>
            <option value="USA Las Vegas - Las Vegas Strip Circuit">USA Las Vegas - Las Vegas Strip Circuit</option>
          </select>
          <label htmlFor="pit">Number of Laps:</label>
          <input
              type="text"
              id="laps"
              name="laps"
              className="wide-input"
              placeholder="1"
              min="0"
            />
          <label htmlFor="pit">Mandatory Pit Stops:</label>
          <input
              type="text"
              id="pit"
              name="pit"
              className="wide-input"
              placeholder="1"
              min="0"
            />
          <label htmlFor="notes">General Notes:</label>
          <textarea
            id="notes"
            name="notes"
            className="wide-input"
            rows={3}
            placeholder="Enter any general information about the track, your driving style, car set up or spersonal preferences."
          />
        </div>

        <div>
          <h2>Soft Tyre</h2>
          <div className="input-group1">
            <label htmlFor="tyreLifeSoft">Tyre Life (laps):</label>
            <input
              type="text"
              id="tyreLifeSoft"
              name="tyreLifeSoft"
              className="wide-input"
              placeholder="10"
              min="0"
            />
          </div>
          <div className="input-group1">
            <label htmlFor="lapTimeSoft">Average Lap Time:</label>
            <input
              type="text"
              id="lapTimeSoft"
              name="lapTimeSoft"
              className="wide-input"
              placeholder="1:23.456 / -0.5s than..."
            />
          </div>
          <div className="input-group1">
            <label htmlFor="notesSoft">Additional Notes:</label>
            <textarea
              id="notesSoft"
              name="notesSoft"
              className="wide-input"
              rows={3}
              placeholder="Enter any additional information about tyre conditions, personal preferences or feedback."
            />
          </div>
        </div>

        <div>
          <h2>Medium Tyre</h2>
          <div className="input-group2">
            <label htmlFor="tyreLifeMedium">Tyre Life (laps):</label>
            <input
              type="text"
              id="tyreLifeMedium"
              name="tyreLifeMedium"
              className="wide-input"
              placeholder="10"
              min="0"
            />
          </div>
          <div className="input-group2">
            <label htmlFor="lapTimeMedium">Average Lap Time:</label>
            <input
              type="text"
              id="lapTimeMedium"
              name="lapTimeMedium"
              className="wide-input"
              placeholder="1:23.456 / -0.5s than..."
            />
          </div>
          <div className="input-group2">
            <label htmlFor="notesMedium">Additional Notes:</label>
            <textarea
              id="notesMedium"
              name="notesMedium"
              className="wide-input"
              rows={3}
              placeholder="Enter any additional information about tyre conditions, personal preferences or feedback."
            />
          </div>
        </div>

        <div>
          <h2>Hard Tyre</h2>
          <div className="input-group3">
            <label htmlFor="tyreLifeHard">Tyre Life (laps):</label>
            <input
              type="text"
              id="tyreLifeHard"
              name="tyreLifeHard"
              className="wide-input"
              placeholder="10"
              min="0"
            />
          </div>
          <div className="input-group3">
            <label htmlFor="lapTimeHard">Average Lap Time:</label>
            <input
              type="text"
              id="lapTimeHard"
              name="lapTimeHard"
              className="wide-input"
              placeholder="1:23.456 / -0.5s than..."
            />
          </div>
          <div className="input-group3">
            <label htmlFor="notesHard">Additional Notes:</label>
            <textarea
              id="notesHard"
              name="notesHard"
              className="wide-input"
              rows={3}
              placeholder="Enter any additional information about tyre conditions, personal preferences or feedback."
            />
          </div>
        </div>

        <button type="submit" className="search-button">
          {loading ? <Loader /> : "Generate"}
        </button>

      </form>

      <div className="result-container">
        {loading ? (
          <div className="loader-container">
          </div>
        ) : (
          result && <p className="result">{result}</p>
        )}
      </div>
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <a
            href="https://chrisroyall.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            chrisroyall.com
          </a>
          . All rights reserved.{" "}
          <a
            href="https://www.termsfeed.com/live/30c42790-370a-49e8-a361-b133d6a789f0"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Privacy Policy.
          </a>
        </p>
      </footer>

    </div>
  );
}

export default App;
