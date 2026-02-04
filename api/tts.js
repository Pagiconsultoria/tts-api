import textToSpeech from "@google-cloud/text-to-speech";

const client = new textToSpeech.TextToSpeechClient();

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST" });
  }

  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Envie um texto" });
  }

  const request = {
    input: { text },
    voice: {
      languageCode: "pt-BR",
      name: "pt-BR-Wavenet-C"
    },
    audioConfig: {
      audioEncoding: "MP3"
    }
  };

  const [response] = await client.synthesizeSpeech(request);

  res.json({
    audioContent: response.audioContent.toString("base64")
  });
}

