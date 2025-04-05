export function request(ctx) {
    const { strat = [] } = ctx.args;

    // Destructure the array for readability
    const [
        track,
        laps,
        pit,
        notes,
        tyreLifeSoft,
        lapTimeSoft,
        notesSoft,
        tyreLifeMedium,
        lapTimeMedium,
        notesMedium,
        tyreLifeHard,
        lapTimeHard,
        notesHard
    ] = strat;
    
    console.log('Data for strat:', strat);
  
    // Construct the prompt with the provided race strat as bullet points
    const prompt = `You are an expert F1 race strategist. Your goal is to provide an accurate race strategy based on specific user inputs.

    1. Provide the race strategy in a structured format with bullet points.
    2. Include a section for pit stops and a section for race strategy.
    3. Suggest optimal pit strategies, stint lengths, compound usage, and tire degradation considerations.
    4. Ensure you provide reasoning behind each pit stop decision and race strategy choice.
    5. If any data points are missing, highlight them and proceed with the available information. Avoid making assumptions.
    
    User Inputs:
    
    Track: ${track}
    Number of Race Laps: ${laps}
    Minimum Pit Stops: ${pit}
    
    Soft Tyre:
    - Tyre Life: ${tyreLifeSoft}
    - Average Lap Time: ${lapTimeSoft}
    - Notes: ${notesSoft}
    
    Medium Tyre:
    - Tyre Life: ${tyreLifeMedium}
    - Average Lap Time: ${lapTimeMedium}
    - Notes: ${notesMedium}
    
    Hard Tyre:
    - Tyre Life: ${tyreLifeHard}
    - Average Lap Time: ${lapTimeHard}
    - Notes: ${notesHard}
    
    Consider these additional general notes for the race strategy: ${notes}`;
    
    console.log('Generated prompt:', prompt);
  
    // Return the request configuration
    const config = {
      resourcePath: `/model/anthropic.claude-3-sonnet-20240229-v1:0/invoke`,
      method: "POST", 
      params: {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          anthropic_version: "bedrock-2023-05-31",
          max_tokens: 1000,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: `${prompt}`,
                },
              ],
            },
          ],
        }),
      },
    };

    console.log('Request config:', config);
    return config;
  }
  
  export function response(ctx) {
    console.log('Raw response:', ctx.result);

    // Parse the response body
    const parsedBody = JSON.parse(ctx.result.body);
    console.log('Parsed response body:', parsedBody);

    // Extract the text content from the response
    const res = {
      body: parsedBody.content[0].text,
    };

    console.log('Final response:', res);
    // Return the response
    return res;
  }
