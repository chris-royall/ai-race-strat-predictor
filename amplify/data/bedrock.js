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

    1. Provide multiple concise strategies in a structured format, including pit stop timing, stint durations, and tire compound choices.
    2. Clearly identify the optimal strategy, along with two alternative strategies.
    3. Begin each strategy with a brief overview (e.g., Soft -> Medium -> Hard).
    4. Specify the exact lap number for each pit stop and the corresponding tire choice.
    5. Justify every decision by explaining the rationale behind pit stop timing, compound selection, and strategy adjustments.
    6. Use bullet points to improve formatting.
    7. Add large spacing between each strategy.
    
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
