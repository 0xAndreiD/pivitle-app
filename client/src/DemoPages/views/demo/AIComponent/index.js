import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import "font-awesome/css/font-awesome.min.css";

import { Button } from "antd";
import { Trash } from "react-bootstrap-icons";

import { Configuration, OpenAIApi } from "openai";

import CoachOnCallSection from "./pages/CoachOnCallSection";
import SchedulerSection from "./pages/SchedulerSection";

// == AI Component == //
import FormSection from "./FormSection";
import CodeFormSection from "./CodeFormSection";
import QuestionSection from "./QuestionSection";
import CodeQuestionSection from "./CodeQuestionSection";
import AnswerSection from "./AnswerSection";
import CodeAnswerSection from "./CodeAnswerSection";
import ChatHistory from "./ChatHistory";
import CodeHistory from "./CodeHistory";

import {
  addChatHistoryItem,
  getChatHistoryItem,
  deleteChatHistory,
} from "../../Redux/ChatHistoryRedux";
import {
  addCodeHistoryItem,
  getCodeHistoryItem,
} from "../../Redux/CodeHistoryRedux";

import Config from "../../utilities/Config";

const AIComponent = ({
  rightSibebarClassName,
  activeTab,
  setActiveTab,
  selectedText,
  setSelectedText,
  loading,
  setLoading,
  storedValues,
  setStoredValues,
  selectButtonClick,
  setSelectButtonClick,
}) => {
  const dispatch = useDispatch();

  const chatScrollRef = useRef(null);

  const { history } = useSelector((state) => state.chat);
  const { codehistory } = useSelector((state) => state.code);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [storedValues, setStoredValues]);

  useEffect(() => {
    dispatch(getChatHistoryItem(""));
    dispatch(getCodeHistoryItem(""));
  }, []);

  useEffect(() => {
    if (selectButtonClick) {
      setSelectButtonClick(false);
      generateResponse(selectedText, setSelectedText);
    }
  }, [selectButtonClick, setSelectButtonClick]);

  const configuration = new Configuration({
    apiKey: Config.openAIKey,
  });

  const openai = new OpenAIApi(configuration);

  const [codeStoredValues, setCodeStoredValues] = useState([]);

  const [clearbuttonloading, setClearbuttonloading] = useState(false);

  const generateResponse = async (newQuestion, setNewQuestion) => {
    setLoading(true);
    let options = {
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["/"],
    };

    const prompt = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. The assistant can also use markdown formatting to include code snippets.\n Human: Hello, who are you? \n AI: I am an Ai created by Clovon with the help of OpenAI. How can I help you today? \n Human: ${newQuestion}. \n AI:`;

    let completeOptions = {
      ...options,
      prompt: prompt,
    };

    try {
      const response = await openai.createCompletion(completeOptions);

      if (response.data.choices) {
        await dispatch(addChatHistoryItem(newQuestion));
        dispatch(getChatHistoryItem(""));
        setStoredValues([
          ...storedValues,
          {
            question: newQuestion,
            answer: response.data.choices[0].text,
          },
        ]);
        setLoading(false);
        setNewQuestion("");
      }
    } catch (err) {
      console.log("error: ", err);
      setLoading(false);
    }
  };

  const generateHistoryResponse = async (
    newHistoryQuestion,
    setNewHistoryQuestion
  ) => {
    setLoading(true);
    let options = {
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["/"],
    };

    const prompt = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly. The assistant can also use markdown formatting to include code snippets.\n Human: Hello, who are you? \n AI: I am an Ai created by Clovon with the help of OpenAI. How can I help you today? \n Human: ${newHistoryQuestion}. \n AI:`;

    let completeOptions = {
      ...options,
      prompt: prompt,
    };

    try {
      const response = await openai.createCompletion(completeOptions);

      if (response.data.choices) {
        setStoredValues([
          ...storedValues,
          {
            question: newHistoryQuestion,
            answer: response.data.choices[0].text,
          },
        ]);
        setLoading(false);
      }
    } catch (err) {
      console.log("error: ", err);
      setLoading(false);
    }
  };

  const generateCodeResponse = async (newCodeQuestion, setNewCodeQuestion) => {
    setLoading(true);
    const CodeQuestion =
      "Can you provide a step-by-step breakdown of how this code works, using Markdown formatting?";

    let options = {
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["/"],
    };

    let completeOptions = {
      ...options,
      prompt: newCodeQuestion + CodeQuestion,
    };

    try {
      const response = await openai.createCompletion(completeOptions);

      if (response.data.choices) {
        setCodeStoredValues([
          ...codeStoredValues,
          {
            question: newCodeQuestion,
            answer: response.data.choices[0].text,
          },
        ]);
        setLoading(false);
        dispatch(addCodeHistoryItem(newCodeQuestion));
        dispatch(getCodeHistoryItem(""));
        setNewCodeQuestion("");
      }
    } catch (err) {
      console.log("error: ", err);
      setLoading(false);
    }
  };

  const generateCodeHistoryResponse = async (
    newCodeHistoryQuestion,
    setNewCodeHistoryQuestion
  ) => {
    setLoading(true);
    const CodeQuestion =
      "Can you provide a step-by-step breakdown of how this code works, using Markdown formatting?";
    let options = {
      model: "text-davinci-003",
      temperature: 0,
      max_tokens: 200,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      stop: ["/"],
    };

    let completeOptions = {
      ...options,
      prompt: newCodeHistoryQuestion + CodeQuestion,
    };

    try {
      const response = await openai.createCompletion(completeOptions);

      if (response.data.choices) {
        setCodeStoredValues([
          ...codeStoredValues,
          {
            question: newCodeHistoryQuestion,
            answer: response.data.choices[0].text,
          },
        ]);
        setLoading(false);
      }
    } catch (err) {
      console.log("error: ", err);
      setLoading(false);
    }
  };

  const handleClearChatHistory = async () => {
    setClearbuttonloading(true);
    await dispatch(deleteChatHistory(""));
    dispatch(getChatHistoryItem(""));
    setClearbuttonloading(false);
  };

  return (
    <div
      id="right-sidebar"
      className={rightSibebarClassName ? "sidebar-open" : ""}
    >
      <div className="sidebar-container">
        <ul className="nav nav-tabs navs-3">
          <li>
            <a
              className={activeTab === "tab-1" ? "nav-link active" : "nav-link"}
              onClick={() => setActiveTab("tab-1")}
            >
              {" "}
              Copilot{" "}
            </a>
          </li>
          <li>
            <a
              className={activeTab === "tab-2" ? "nav-link active" : "nav-link"}
              onClick={() => setActiveTab("tab-2")}
            >
              {" "}
              Code Copilot{" "}
            </a>
          </li>
          <li>
            <a
              className={activeTab === "tab-3" ? "nav-link active" : "nav-link"}
              onClick={() => setActiveTab("tab-3")}
            >
              Coach on Call{" "}
            </a>
          </li>
        </ul>
        <div className="tab-content">
          {/* Copilot Section */}
          <div
            id="tab-1"
            className={activeTab === "tab-1" ? "tab-pane active" : "tab-pane"}
          >
            <div className="sidebar-title">
              <i className="fa fa-comments-o"></i> AgileBot is an IA engine that
              allows you to have a conversation about what matters in Agile and
              organization.
            </div>
            <div className="chat-response" ref={chatScrollRef}>
              <div className="chat">
                {}
                {storedValues &&
                  storedValues.map((item, index) => (
                    <div key={index}>
                      <QuestionSection storedValues={item} />
                      <AnswerSection storedValues={item} />
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <FormSection
                generateResponse={generateResponse}
                newQuestion={selectedText}
                setNewQuestion={setSelectedText}
                loading={loading}
              />
            </div>
            <div className="sidebar-title">
              <i className="fa fa-comment"></i> Copilot Chat History
            </div>
            <div className="ibox-content inspinia-timeline">
              <div className="full-height-scroll">
                {!!history &&
                  history
                    .slice(0)
                    .reverse()
                    .map((item, index) => (
                      <div key={index}>
                        <ChatHistory
                          history={item}
                          generateHistoryResponse={generateHistoryResponse}
                        />
                      </div>
                    ))}
              </div>
            </div>
            <Button
              className="clear-chat-button"
              onClick={handleClearChatHistory}
              loading={clearbuttonloading}
            >
              <Trash />
              Clear Conversation
            </Button>
          </div>

          {/* Code Explainer Section */}
          <div
            id="tab-2"
            className={activeTab === "tab-2" ? "tab-pane active" : "tab-pane"}
          >
            <div className="sidebar-title">
              <i className="fa fa-cube"></i> Code explainer helps you review
              your code and provide suggestions on how to make it better.
            </div>
            <div className="chat-response">
              <div className="chat">
                {codeStoredValues &&
                  codeStoredValues.map((item, index) => (
                    <div key={index}>
                      <CodeQuestionSection codeStoredValues={item} />
                      <CodeAnswerSection codeStoredValues={item} />
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <CodeFormSection
                generateCodeResponse={generateCodeResponse}
                loading={loading}
              />
            </div>
            <div className="sidebar-title">
              <i className="fa fa-comment"></i> Code Copilot History
            </div>
            <div className="ibox-content inspinia-timeline">
              <div className="full-height-scroll">
                {!!codehistory &&
                  codehistory
                    .slice(0)
                    .reverse()
                    .map((item, index) => (
                      <div key={index}>
                        <CodeHistory
                          history={item}
                          generateCodeHistoryResponse={
                            generateCodeHistoryResponse
                          }
                        />
                      </div>
                    ))}
              </div>
            </div>
            {/* Code Copilot Chat History Section */}
            <Button className="clear-chat-button" loading={clearbuttonloading}>
              <Trash />
              Clear Conversation
            </Button>
          </div>
          <CoachOnCallSection activeTab={activeTab} />
        </div>
      </div>
      {/* <SchedulerSection /> */}
    </div>
  );
};

export default AIComponent;
