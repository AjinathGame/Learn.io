import responder from "../utils/responder.js";
import askai from "../config/Askai.js";
import prompt from "../utils/promtGenrate.js";
import Roadmap from "../models/roadmap.model.js";


const ganarateRoadmap = async (req, res) => {
    try {
        
        let {topic} = req.body;

        if(!topic){
            return responder(res, 406, null, "topic is required", false);
        }

        let question = prompt(topic);

        let answer = await askai(question);
         
       const createdRoadmap = await Roadmap.create({
        name:topic,
        roadmap:answer,
        createdBy:req.user._id
       });

       const savedRoadmap = await createdRoadmap.save();

       return responder(res, 200,savedRoadmap.name, "roadmap created successfully", true);
        

    } catch (error) {
        
    }
}

export { ganarateRoadmap }