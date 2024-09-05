import React, { useState, useEffect } from "react";
import Graph from "./components/Graph";
import Table from "./components/Table/Table";
import { transformData, RawData } from './utils/transformData';
import Period from "./components/Period";

const App: React.FC = () => {
  const rawData: RawData = {
    "AI21__Jamba_1_5_Large": [
      {
        "date": "2024-08-30 23:30:39",
        "google": "0.075/0.30",
        "mistral": "3/9",
        "openrouter": "2.5/7.5"
      }
    ],
    "Airoboros_70B": [{ "date": "2024-08-30 23:30:39", "openrouter": "0.5/0.5" }],
    "Anthropic__Claude_3_5_Sonnet__self_moderated_": [
      { "date": "2024-08-30 23:30:39", "openrouter": "15/75" }
    ],
    "Anthropic__Claude_Instant_v1_1": [
      { "date": "2024-08-30 23:30:39", "openrouter": "8/24" }
    ],
    "Anthropic__Claude_Instant_v1__self_moderated_": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.8/2.4" }
    ],
    "Codestral": [
      { "date": "2024-08-30 23:30:39", "deepseek": "0.14/0.28", "mistral": "1/3" }
    ],
    "Cohere__Command_R_": [
      {
        "cohere": "2.50/10.00",
        "date": "2024-08-30 23:30:39",
        "openrouter": "1/2"
      }
    ],
    "Cohere__Command_R__03_2024_": [],
    "Databricks__DBRX_132B_Instruct": [
      { "date": "2024-08-30 23:30:39", "openrouter": "1.08/1.08" }
    ],
    "DeepSeek_Coder_V2": [
      {
        "date": "2024-08-30 23:30:39",
        "deepseek": "0.14/0.28",
        "openrouter": "0.14/0.28"
      }
    ],
    "Dolphin_Llama_3_70B__": [
      {
        "cloudflare": "0.16/0.24",
        "date": "2024-08-30 23:30:39",
        "openrouter": "1.125/1.125"
      }
    ],
    "Flavor_of_The_Week": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0/0" }
    ],
    "Google__Gemini_Flash_1_5": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.0375/0.15" }
    ],
    "Google__Gemini_Flash_8B_1_5_Experimental": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.45/0.45" }
    ],
    "Google__Gemini_Pro_1_5_Experimental": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0/0" }
    ],
    "Google__Gemini_Pro_Vision_1_0": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.125/0.375" }
    ],
    "Google__Gemma_2_27B": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.07/0.07" }
    ],
    "Google__Gemma_2_9B__free_": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0/0" }
    ],
    "Google__PaLM_2_Code_Chat_32k": [
      {
        "date": "2024-08-30 23:30:39",
        "groq": "0.20/0.20",
        "openrouter": "0.25/0.5"
      }
    ],
    "Hugging_Face__Zephyr_7B__free_": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0/0" }
    ],
    "Llama_3_1_Euryale_70B_v2_2": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.27/0.27" }
    ],
    "Llama_3_70B_8k": [{ "date": "2024-08-30 23:30:39", "groq": "0.05/0.08" }],
    "Llama_3_8B_Lunaris": [
      {
        "cloudflare": "0.11/0.19",
        "date": "2024-08-30 23:30:39",
        "mistral": "2.75/8.1",
        "openrouter": "0.17/0.17"
      }
    ],
    "Llama_3_Lumimaid_8B__extended_": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.1875/1.125" }
    ],
    "Magnum_72B": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.055/0.055" }
    ],
    "Mancer__Weaver__alpha_": [
      { "date": "2024-08-30 23:30:39", "openrouter": "1.875/2.25" }
    ],
    "Meta__Llama_3_1_405B__base_": [
      { "date": "2024-08-30 23:30:39", "openrouter": "2/2" }
    ],
    "Mistral_Nemo_12B_Starcannon": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.8/2.4" }
    ],
    "Mistral_Small": [
      { "date": "2024-08-30 23:30:39", "mistral": "1/3", "openrouter": "2/6" }
    ],
    "Mistral__Mistral_7B_Instruct": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.055/0.055" }
    ],
    "Mistral__Mistral_7B_Instruct__free_": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0/0" }
    ],
    "Mistral__Mistral_7B_Instruct__nitro_": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.07/0.07" }
    ],
    "Mistral__Mistral_7B_Instruct_v0_3": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.055/0.055" }
    ],
    "Mistral__Mistral_Nemo": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.07/0.07" }
    ],
    "Mistral__Mixtral_8x22B_Instruct": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.65/0.65" }
    ],
    "MythoMax_13B__extended_": [
      { "date": "2024-08-30 23:30:39", "openrouter": "1.125/1.125" }
    ],
    "MythoMist_7B__free_": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.07/0.07" }
    ],
    "NousResearch__Hermes_2_Pro___Llama_3_8B": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.14/0.14" }
    ],
    "Nous__Hermes_2_Theta_8B": [
      { "date": "2024-08-30 23:30:39", "openrouter": "N/A/N/A" }
    ],
    "Nous__Hermes_3_405B_Instruct__extended_": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0/0" }
    ],
    "OpenAI__ChatGPT_4o": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.5/1.5" }
    ],
    "OpenAI__GPT_3_5_Turbo_16k__older_v1106_": [
      { "date": "2024-08-30 23:30:39", "openrouter": "1/2" }
    ],
    "OpenAI__GPT_4_Turbo_Preview": [
      { "date": "2024-08-30 23:30:39", "openrouter": "1/2" }
    ],
    "OpenAI__GPT_4o_mini__2024_07_18_": [
      { "date": "2024-08-30 23:30:39", "openrouter": "60/120" }
    ],
    "Perplexity__Llama_3_1_Sonar_70B_Online": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.2/0.2" }
    ],
    "Phi_3_5_Mini_128K_Instruct": [
      {
        "date": "2024-08-30 23:30:39",
        "groq": "0.07/0.07",
        "microsoft": "0.80/0.0005",
        "openrouter": "8/24"
      }
    ],
    "Qwen_2_7B_Instruct__free_": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0/0" }
    ],
    "RWKV_v5_World_3B": [{ "date": "2024-08-30 23:30:39", "openrouter": "0/0" }],
    "ReMM_SLERP_13B": [
      { "date": "2024-08-30 23:30:39", "openrouter": "1.125/1.125" }
    ],
    "Toppy_M_7B": [{ "date": "2024-08-30 23:30:39", "openrouter": "0.07/0.07" }],
    "Xwin_70B": [{ "date": "2024-08-30 23:30:39", "openrouter": "3.75/3.75" }],
    "Yi_1_5_34B_Chat": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.2/0.2" }
    ],
    "col_01_AI__Yi_Large_FC": [
      { "date": "2024-08-30 23:30:39", "openrouter": "3/9" }
    ],
    "col_01_AI__Yi_Vision": [
      { "date": "2024-08-30 23:30:39", "openrouter": "0.19/0.19" }
    ],
    "gpt_4o": [{ "date": "2024-08-30 23:30:39", "openAI": "5.00/2.50" }],
    "gpt_4o_2024_08_06": [
      { "date": "2024-08-30 23:30:39", "openAI": "5.00/2.50" }
    ],
    "llama_2_7b_chat_fp16": [
      { "cloudflare": "0.56/6.66", "date": "2024-08-30 23:30:39" }
    ],
    "lzlv_70B": [{ "date": "2024-08-30 23:30:39", "openrouter": "0.35/0.4" }]
  };

  const [tableData, setTableData] = useState<ReturnType<typeof transformData>>([]);

  useEffect(() => {
<<<<<<< HEAD
    const transformedData = transformData(rawData);
    setTableData(transformedData);
=======
    const fetchData = async () => {
      try {
        console.log('Fetching data...'); // Лог для проверки выполнения запроса

        // Получаем текущую дату
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Месяцы начинаются с 0
        const day = String(today.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;

        // Формируем URL с текущей датой
        const response = await fetch(`http://145.249.249.29:3006/date/${formattedDate}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const rawData: RawData = await response.json();
        console.log('Raw data:', rawData); // Лог для проверки сырых данных
        const transformedData = transformData(rawData);
        console.log('Transformed data:', transformedData); // Лог для проверки трансформированных данных
        setTableData(transformedData);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
      }
    };

    fetchData();
>>>>>>> 3053ff3 (create connection and sort)
  }, []);

  return (
    <div>
      <Graph />
      <Period />
      <Table data={tableData} />
    </div>
  );
};

export default App;

