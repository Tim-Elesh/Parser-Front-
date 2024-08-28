/*const data = [
    { name: 'Jan', uv: 4000, pv: 2400 },
    { name: 'Feb', uv: 3000, pv: 1398 },
    { name: 'Mar', uv: 2000, pv: 9800 },
    { name: 'Apr', uv: 2780, pv: 3908 },
    { name: 'May', uv: 1890, pv: 4800 },
    { name: 'Jun', uv: 2390, pv: 3800 },
    { name: 'Jul', uv: 3490, pv: 4300 },
  ];*/


  const data = [
      { name: '28.08.2024',uv: '2.029861111111112',pv: '4.872368055555553'},
      { name: '28.08.2024',uv: '1.029861111111112',pv: '6.872368055555553'},
      { name: '28.08.2024',uv: '4.029861111111112',pv: '3.872368055555553'},
      { name: '28.08.2024',uv: '3.029861111111112',pv: '5.872368055555553'},
  ]
  
 
/* const data = [
  {
    "Llama 3.1 Euryale 70B v2.2": {
        "openrouter": {
            "input_price": "0.27",
            "output_price": "0.27"
        }
    },
    "AI21: Jamba 1.5 Large": {
        "openrouter": {
            "input_price": "2.5",
            "output_price": "7.5"
        },
        "mistral": {
            "input_price": "3",
            "output_price": "9"
        },
        "google": {
            "input_price": "0,075",
            "output_price": "0,30"
        }
    },
    "Yi 1.5 34B Chat": {
        "openrouter": {
            "input_price": "0.2",
            "output_price": "0.2"
        }
    },
    "Phi-3.5 Mini 128K Instruct": {
        "openrouter": {
            "input_price": "8",
            "output_price": "24"
        },
        "groq": {
            "input_price": "0.07",
            "output_price": "0.07"
        },
        "microsoft": {
            "input_price": "0.80",
            "output_price": "0.0005"
        }
    },
    "Nous: Hermes 3 405B Instruct (extended)": {
        "openrouter": {
            "input_price": "0.72",
            "output_price": "0.72"
        }
    },
    "Perplexity: Llama 3.1 Sonar 405B Online": {
        "openrouter": {
            "input_price": "0.2",
            "output_price": "0.2"
        }
    },
    "OpenAI: ChatGPT-4o": {
        "openrouter": {
            "input_price": "0.5",
            "output_price": "1.5"
        }
    },
    "Llama 3 8B Lunaris": {
        "openrouter": {
            "input_price": "0.17",
            "output_price": "0.17"
        },
        "mistral": {
            "input_price": "2.75",
            "output_price": "8.1"
        },
        "cloudflare": {
            "input_price": "0.11",
            "output_price": "0.19"
        }
    },
    "Mistral Nemo 12B Starcannon": {
        "openrouter": {
            "input_price": "0.8",
            "output_price": "2.4"
        }
    },
    "Meta: Llama 3.1 405B (base)": {
        "openrouter": {
            "input_price": "0.81",
            "output_price": "0.81"
        }
    },
    "01.AI: Yi Vision": {
        "openrouter": {
            "input_price": "0.19",
            "output_price": "0.19"
        }
    },
    "01.AI: Yi Large FC": {
        "openrouter": {
            "input_price": "3",
            "output_price": "9"
        }
    },
    "Google: Gemini Pro 1.5 (0801)": {
        "openrouter": {
            "input_price": "0.125",
            "output_price": "0.375"
        }
    },
    "Dolphin Llama 3 70B 🐬": {
        "openrouter": {
            "input_price": "1.125",
            "output_price": "1.125"
        },
        "cloudflare": {
            "input_price": "0.16",
            "output_price": "0.24"
        }
    },
    "Mistral: Mistral Nemo": {
        "openrouter": {
            "input_price": "0.07",
            "output_price": "0.07"
        }
    },
    "OpenAI: GPT-4o-mini (2024-07-18)": {
        "openrouter": {
            "input_price": "60",
            "output_price": "120"
        }
    },
    "Qwen 2 7B Instruct (free)": {
        "openrouter": {
            "input_price": "0",
            "output_price": "0"
        }
    },
    "Google: Gemma 2 27B": {
        "openrouter": {
            "input_price": "0.07",
            "output_price": "0.07"
        }
    },
    "Magnum 72B": {
        "openrouter": {
            "input_price": "0.055",
            "output_price": "0.055"
        }
    },
    "Nous: Hermes 2 Theta 8B": {
        "openrouter": {
            "input_price": "N/A",
            "output_price": "N/A"
        }
    },
    "Google: Gemma 2 9B (free)": {
        "openrouter": {
            "input_price": "0",
            "output_price": "0"
        }
    },
    "Flavor of The Week": {
        "openrouter": {
            "input_price": "0",
            "output_price": "0"
        }
    },
    "Anthropic: Claude 3.5 Sonnet (self-moderated)": {
        "openrouter": {
            "input_price": "15",
            "output_price": "75"
        }
    },
    "NousResearch: Hermes 2 Pro - Llama-3 8B": {
        "openrouter": {
            "input_price": "0.14",
            "output_price": "0.14"
        }
    },
    "Mistral: Mistral 7B Instruct v0.3": {
        "openrouter": {
            "input_price": "0.055",
            "output_price": "0.055"
        }
    },
    "Mistral: Mistral 7B Instruct (free)": {
        "openrouter": {
            "input_price": "0",
            "output_price": "0"
        }
    },
    "Mistral: Mistral 7B Instruct": {
        "openrouter": {
            "input_price": "0.055",
            "output_price": "0.055"
        }
    },
    "Mistral: Mistral 7B Instruct (nitro)": {
        "openrouter": {
            "input_price": "0.07",
            "output_price": "0.07"
        }
    },
    "Google: Gemini Flash 1.5": {
        "openrouter": {
            "input_price": "0.0375",
            "output_price": "0.15"
        }
    },
    "DeepSeek-Coder-V2": {
        "openrouter": {
            "input_price": "0.14",
            "output_price": "0.28"
        },
        "deepseek": {
            "input_price": "0.14",
            "output_price": "0.28"
        }
    },
    "Meta: Llama 3 8B (Base)": {
        "openrouter": {
            "input_price": "0.18",
            "output_price": "0.18"
        }
    },
    "Llama 3 Lumimaid 8B (extended)": {
        "openrouter": {
            "input_price": "0.1875",
            "output_price": "1.125"
        }
    },
    "Snowflake: Arctic Instruct": {
        "openrouter": {
            "input_price": "2.16",
            "output_price": "2.16"
        }
    },
    "Mistral: Mixtral 8x22B Instruct": {
        "openrouter": {
            "input_price": "0.65",
            "output_price": "0.65"
        }
    },
    "Mistral: Mixtral 8x22B (base)": {
        "openrouter": {
            "input_price": "1.08",
            "output_price": "1.08"
        }
    },
    "Cohere: Command R+": {
        "openrouter": {
            "input_price": "1",
            "output_price": "2"
        },
        "cohere": {
            "input_price": "3.00",
            "output_price": "15.00"
        }
    },
    "Databricks: DBRX 132B Instruct": {
        "openrouter": {
            "input_price": "1.08",
            "output_price": "1.08"
        }
    },
    "OpenAI: GPT-4 Turbo Preview": {
        "openrouter": {
            "input_price": "1",
            "output_price": "2"
        }
    },
    "Mistral Small": {
        "openrouter": {
            "input_price": "2",
            "output_price": "6"
        },
        "mistral": {
            "input_price": "1",
            "output_price": "3"
        }
    },
    "RWKV v5 World 3B": {
        "openrouter": {
            "input_price": "0",
            "output_price": "0"
        }
    },
    "StripedHyena Hessian 7B (base)": {
        "openrouter": {
            "input_price": "0.18",
            "output_price": "0.18"
        }
    },
    "MythoMist 7B (free)": {
        "openrouter": {
            "input_price": "0.07",
            "output_price": "0.07"
        }
    },
    "Yi 6B (base)": {
        "openrouter": {
            "input_price": "0.18",
            "output_price": "0.18"
        }
    },
    "Nous: Capybara 7B": {
        "openrouter": {
            "input_price": "0.18",
            "output_price": "0.18"
        }
    },
    "Anthropic: Claude Instant v1.1": {
        "openrouter": {
            "input_price": "8",
            "output_price": "24"
        }
    },
    "lzlv 70B": {
        "openrouter": {
            "input_price": "0.35",
            "output_price": "0.4"
        }
    },
    "Toppy M 7B": {
        "openrouter": {
            "input_price": "0.07",
            "output_price": "0.07"
        }
    },
    "OpenAI: GPT-3.5 Turbo 16k (older v1106)": {
        "openrouter": {
            "input_price": "1",
            "output_price": "2"
        }
    },
    "Google: PaLM 2 Code Chat 32k": {
        "openrouter": {
            "input_price": "0.25",
            "output_price": "0.5"
        },
        "groq": {
            "input_price": "0.20",
            "output_price": "0.20"
        }
    },
    "Airoboros 70B": {
        "openrouter": {
            "input_price": "0.5",
            "output_price": "0.5"
        }
    },
    "Xwin 70B": {
        "openrouter": {
            "input_price": "3.75",
            "output_price": "3.75"
        }
    },
    "Hugging Face: Zephyr 7B (free)": {
        "openrouter": {
            "input_price": "0",
            "output_price": "0"
        }
    },
    "Mancer: Weaver (alpha)": {
        "openrouter": {
            "input_price": "1.875",
            "output_price": "2.25"
        }
    },
    "Anthropic: Claude Instant v1 (self-moderated)": {
        "openrouter": {
            "input_price": "0.8",
            "output_price": "2.4"
        }
    },
    "ReMM SLERP 13B": {
        "openrouter": {
            "input_price": "1.125",
            "output_price": "1.125"
        }
    },
    "MythoMax 13B (extended)": {
        "openrouter": {
            "input_price": "1.125",
            "output_price": "1.125"
        }
    },
    "Llama 3 70B 8k": {
        "groq": {
            "input_price": "0.05",
            "output_price": "0.08"
        }
    },
    "Codestral": {
        "mistral": {
            "input_price": "1",
            "output_price": "3"
        },
        "deepseek": {
            "input_price": "0.14",
            "output_price": "0.28"
        }
    },
    "gpt-4o": {
        "openAI": {
            "input_price": "5.00",
            "output_price": "2.50"
        }
    },
    "gpt-4o-2024-08-06": {
        "openAI": {
            "input_price": "5.00",
            "output_price": "2.50"
        }
    },
    "llama-2-7b-chat-fp16": {
        "cloudflare": {
            "input_price": "0.56",
            "output_price": "6.66"
        }
    }
}
] */

export default data;