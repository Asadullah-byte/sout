import axios from 'axios';
import dotenv from "dotenv"

dotenv.config();
export const takeInput = async (req, res) => {
    const userInput = req.body.input;
    try{
        if(userInput == null || String(userInput).trim() === ''){
            throw new Error("Input is required!!");
        }
        // res.status(200).json({success:true, message:"Input sent to model", userInput});
         const response = await axios.post(
            "https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions",
            {
                inputs: userInput
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.HF_API_KEY}`
                }
            }
        );

        const predictions = response.data;
        res.status(200).json({ success: true, message: "Emotion extracted", userInput, predictions });

        
    }
    catch(err) {
        console.error("Error", err);
        res.status(500).json({success:false, message: err.message});
    }
}