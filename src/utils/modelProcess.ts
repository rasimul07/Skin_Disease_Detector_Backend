// import * as tf from "@tensorflow/tfjs";
// import { createCanvas, loadImage } from "canvas";
// import path from "path";
// import fetch from "node-fetch";

// const modelPath = "F:\projects\SDD android app\Skin_Disease_Detector_Backend\src\AI-model\ssd_model.json";
// let model: tf.GraphModel;

// tf.loadGraphModel(modelPath)
//   .then((loadedModel) => {
//     model = loadedModel;
//     console.log("Model loaded");
//   })
//   .catch((error) => {
//     console.error("Error loading model:", error);
//   });

// // Load and preprocess image function
// async function loadAndPrepImage(url: string): Promise<tf.Tensor> {
//   const response = await fetch(url);
//   const buffer = await response.buffer();
//   const image = await loadImage(buffer);
//   const canvas = createCanvas(224, 224); // Assuming the model expects 224x224 images
//   const ctx = canvas.getContext("2d");
//   ctx.drawImage(image, 0, 0, 224, 224);
//   const imageData = ctx.getImageData(0, 0, 224, 224);
//   const input = tf.browser
//     .fromPixels(imageData)
//     .toFloat()
//     .div(tf.scalar(255))
//     .expandDims();
//   return input;
// }

// // Prediction and plot function
// async function predAndPlot(url: string, classNames: string[]): Promise<string> {
//   const img = await loadAndPrepImage(url);
//   const pred = model.predict(img) as tf.Tensor;
//   const predClassIndex = (await pred.argMax(-1).data())[0];
//   const predClass = classNames[predClassIndex];
//   return predClass;
// }

// // Define class names
// const classNames = [
//   "AIDS",
//   "Acne",
//   "Atopic-Dermatitis",
//   "Cellulitis",
//   "Comedones",
//   "Drug Eruptions",
//   "Ecthyma",
//   "EczemaStaph",
//   "Erysipelas",
//   "Fibrofolliculoma",
//   "Folliculitis",
//   "Fungal Infection",
//   "Furuncles-Carbuncles",
//   "Leprosy",
//   "Lupus-vulgaris",
//   "Perioral",
//   "Sycosis-Barbae",
//   "Systemic Disease",
//   "Urticaria Hives",
//   "VesselsNose",
//   "accessory-trachus",
//   "acne-closed-comedo",
//   "acne-cystic",
//   "acne-excoriated",
//   "acne-infantile",
//   "acne-open-comedo",
//   "acne-primary-lesion",
//   "acne-pustular",
//   "acne-scar",
//   "actinic-cheilitis-sq-cell-lip",
//   "actinic-comedones",
//   "actinic-granuloma",
//   "actinic-keratosis",
//   "albinism",
//   "allergic-contact-dermatitis",
//   "amyloidosis",
//   "anal-Comedones",
//   "basal-cell-carcinoma",
//   "birtHogDube",
//   "cafe-au-lait-spots",
//   "candidiasis-mouth",
//   "contact-airborne",
//   "cosmetic-fragrance-allergy",
//   "cowden-disease",
//   "crest-syndrome",
//   "ctcl",
//   "dermatomyositis",
//   "dermatosis-papulosa-nigra",
//   "eczema",
//   "eczema-herpeticum-",
//   "epidermal-cyst",
//   "epidermal-nevus",
//   "erythema-infectiosum",
//   "erythema-multiforme",
//   "erythma",
//   "exfoliative-dermatitis",
//   "fibroma",
//   "follicular-mucinosis",
//   "fordyce-spots",
//   "freckles",
//   "gianotti-crosti",
//   "gonorrhea",
//   "granulation-tissue",
//   "granuloma",
//   "granuloma-faciale",
//   "hand-foot-mouth-disease",
//   "hemangioma",
//   "herpes",
//   "hidradenitis-suppurativa",
//   "hydroa-aestivale",
//   "hydroa-vacciniforme",
//   "hydrocystoma",
//   "hyperhidrosis",
//   "hypothyroidism",
//   "idiopathic-guttate-hypomelanosis",
//   "impetigo",
//   "irritant-contact-dermatitis",
//   "kawasaki-syndrome",
//   "keratoacanthoma",
//   "keratoses",
//   "lentigo-adults",
//   "lentigo-children",
//   "leukoplakia",
//   "lipoid-proteinosis",
//   "lupus-acute",
//   "lupus-chronic-cutaneous",
//   "melanoma",
//   "melasma",
//   "milia",
//   "minocycline-pigmentation",
//   "molluscum-contagiosum",
//   "mongolian-spot",
//   "morphea",
//   "mucinosis",
//   "neurofibromas",
//   "nevus-anemicus",
//   "nevus-comedonicus",
//   "normal condition",
//   "perioral-dermatitis",
//   "perleche",
//   "phototoxic-reactions",
//   "pityriasis-rubra-pilaris",
//   "polymorphous-light-eruption",
//   "porphyrias",
//   "psoriasis-scalp",
//   "purpura-vomiting",
//   "pyogenic-granuloma",
//   "rhinophyma",
//   "rhus-dermatitis",
//   "rosacea",
//   "scarlet-fever",
//   "scleroderma",
//   "sebDerm",
//   "sebaceous-adenoma",
//   "sebaceous-glands",
//   "sebaceous-hyperplasia",
//   "seborrheic-dermatitis",
//   "skin-tags-polyps",
//   "spider-angioma",
//   "squamous-cell-carcinoma",
//   "stevens-johnson-syndrome",
//   "sun-damaged-skin",
//   "sunburn",
//   "syringoma",
//   "telangiectasias",
//   "tinea",
//   "trichoepithelioma",
//   "trichofolliculoma",
//   "tuberous-sclerosis",
//   "unilateral-telangiectasia",
//   "varicella",
//   "venous-lake",
//   "venous-malformations",
//   "verrucous-carcinoma",
//   "vitiligo",
//   "warts",
//   "xanthomas",
// ];
