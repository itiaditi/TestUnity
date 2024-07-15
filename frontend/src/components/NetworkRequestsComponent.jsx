import { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { FaRegStopCircle, FaRegSquare, FaCaretDown } from "react-icons/fa";
import { AiOutlineStop } from "react-icons/ai";
import {
  MdFilterAlt,
  MdLaptop,
  MdOutlineFileDownload,
  MdOutlineFileUpload,
  MdOutlineWifiPassword,
} from "react-icons/md";
import { IoIosCheckbox, IoMdSearch } from "react-icons/io";
import { LuArrowUpLeftSquare } from "react-icons/lu";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)", // Default background color
  // Add your custom styles here for the Accordion
  "&.customAccordion": {
    backgroundColor: "black",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <ArrowForwardIosSharpIcon
        sx={{ fontSize: "0.9rem", color: "white", transform: "rotate(-90deg)" }}
      />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  color: "white",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(0deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
  color: "white",
}));

function NetworkRequestsComponent() {
  const [url, setUrl] = useState("");
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("All");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [expanded, setExpanded] = useState("general");

  useEffect(() => {
    const filterRequests = () => {
      if (filter === "All") {
        setFilteredRequests(requests);
      } else if (filter === "Img") {
        const filtered = requests.filter(
          (request) =>
            request.request_url.toLowerCase().endsWith(".png") ||
            request.request_url.toLowerCase().endsWith(".jpg") ||
            request.response_type?.includes("image")
        );
        setFilteredRequests(filtered);
      } else if (filter === "JS") {
        const filtered = requests.filter(
          (request) =>
            request.request_url.toLowerCase().endsWith(".js") ||
            request.response_type?.includes("script")
        );
        setFilteredRequests(filtered);
      } else if (filter === "CSS") {
        const filtered = requests.filter(
          (request) =>
            request.request_url.toLowerCase().endsWith(".css") ||
            request.response_type?.includes("css")
        );
        setFilteredRequests(filtered);
      } else if (filter === "Font") {
        const filtered = requests.filter((request) =>
          request.response_type?.includes("font")
        );
        setFilteredRequests(filtered);
      } else if (filter === "XHR") {
        const filtered = requests.filter(
          (request) =>
            request.request_url.toLowerCase().includes("xhr") ||
            request.response_type?.includes("json") ||
            request.response_type?.includes("xml")
        );
        setFilteredRequests(filtered);
      } else if (filter === "Doc") {
        const filtered = requests.filter((request) =>
          request.response_type?.includes("html")
        );
        setFilteredRequests(filtered);
      }
    };

    filterRequests();
  }, [requests, filter]);

  const handleChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/requests",
        { url }
      );
      setRequests(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error capturing requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const openDetailsModal = (request) => {
    setSelectedRequest(request);
  };

  const closeDetailsModal = () => {
    setSelectedRequest(null);
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };
  return (
    <div className="main-section">
      <div className="header">
        <ul className="menu">
          <li
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ margin: "0 8px" }}>
              <LuArrowUpLeftSquare />
            </span>
            <span style={{ margin: "0 8px" }}>
              <MdLaptop />
            </span>
            <span>|</span>
          </li>

          <li>Elements</li>
          <li>Console</li>
          <li className="active">Network</li>
          <li>Sources</li>
          <li>Performance</li>
          <li>Memory</li>
          <li>Application</li>
          <li>Lighthouse</li>
          <li></li>
        </ul>
        <ul className="menu">
          <li
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <FaRegStopCircle color="red" />
            <AiOutlineStop />
            <span style={{ margin: "0 8px" }}>|</span>
            <MdFilterAlt color="red" />
            <IoMdSearch />
            <span style={{ margin: "0 8px" }}>|</span>
            <span
              style={{ margin: "0 8px", display: "flex", alignItems: "center" }}
            >
              <IoIosCheckbox color="lightblue" /> &nbsp;{" "}
              <span>Preserve log</span>
              <span style={{ margin: "0 8px" }}>|</span>
            </span>
            <span
              style={{ margin: "0 8px", display: "flex", alignItems: "center" }}
            >
              <FaRegSquare /> &nbsp; <span>Disable cache</span>
              <span style={{ margin: "0 8px" }}>No throttling</span>
              <span style={{ margin: "0 8px" }}>
                <FaCaretDown />
              </span>
              <span style={{ margin: "0 8px" }}>
                <MdOutlineWifiPassword />
              </span>
              <span style={{ margin: "0 8px" }}>|</span>
              <span style={{ margin: "0 8px" }}>
                <MdOutlineFileUpload size={20} />
              </span>
              <span style={{ margin: "0 8px" }}>
                <MdOutlineFileDownload size={20} />
              </span>
            </span>
          </li>
        </ul>
        <div className="input">
          <form
            style={{ display: "flex", alignItems: "center" }}
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={url}
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              placeholder="Enter URL"
            />
            <div>
              <span
                style={{
                  margin: "0 8px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <FaRegSquare /> &nbsp;
                <span>Invert</span>
                <span>|</span> {/* No need for margin here */}
                <span style={{ display: "flex", alignItems: "center" }}>
                  <FaRegSquare /> &nbsp;
                  <span>Hide data URLs</span>
                  <span style={{ margin: "0 8px" }}>|</span>{" "}
                  {/* Properly spaced */}
                  <FaRegSquare /> &nbsp;
                  <span>Hide extension URLs</span>
                </span>
              </span>
            </div>
          </form>
          <div>
            <button onClick={() => handleFilterChange("All")}>All</button>
            <button onClick={() => handleFilterChange("XHR")}>
              Fetch / XHR
            </button>
            <button onClick={() => handleFilterChange("Doc")}>Doc</button>
            <button onClick={() => handleFilterChange("JS")}>JS</button>
            <button onClick={() => handleFilterChange("CSS")}>CSS</button>
            <button onClick={() => handleFilterChange("Font")}>Font</button>
            <button onClick={() => handleFilterChange("Img")}>Img</button>
          </div>
          <div>
            <span
              style={{ margin: "0 8px", display: "flex", alignItems: "center" }}
            >
              <FaRegSquare /> &nbsp; <span>3rd-party requests</span>
            </span>
          </div>
        </div>
      </div>
      <div className="main">
        {loading ? (
          <p className="initial-message">Loading...</p>
        ) : filteredRequests.length === 0 ? (
          <p className="initial-message">
            Recording network activity... <br /> Perform a request or hit{" "}
            <b>Ctrl + R </b> to record the reload. <br /> <u>Learn more</u>
          </p>
        ) : (
          <div className="table-container">
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Name</th>
                  {selectedRequest ? (
                    <th style={{ position: "relative" }}>
                      <div className="model-main">
                        <div className="modal">
                          <div className="modal-content">
                            <span className="close" onClick={closeDetailsModal}>
                              &times;
                            </span>
                            <h2>Request Details</h2>

                            {/* General Info */}
                            <Accordion
                              expanded={expanded === "general"}
                              onChange={() =>
                                setExpanded(
                                  expanded === "general" ? "" : "general"
                                )
                              }
                            >
                              <AccordionSummary
                                aria-controls="general-info-content"
                                id="general-info-header"
                              >
                                <Typography>General</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <table className="header-table">
                                  <tbody>
                                    <tr>
                                      <td>Request URL</td>
                                      <td>{selectedRequest.request_url}</td>
                                    </tr>
                                    <tr>
                                      <td>Request Method</td>
                                      <td>{selectedRequest.request_method}</td>
                                    </tr>
                                    <tr>
                                      <td>Status Code</td>
                                      <td>{selectedRequest.response_status}</td>
                                    </tr>
                                    <tr>
                                      <td>Remote Address</td>
                                      <td>{selectedRequest.remote_address}</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </AccordionDetails>
                            </Accordion>

                            {/* Request Headers */}
                            <Accordion
                              expanded={expanded === "request-headers"}
                              onChange={() =>
                                setExpanded(
                                  expanded === "request-headers"
                                    ? ""
                                    : "request-headers"
                                )
                              }
                            >
                              <AccordionSummary
                                aria-controls="request-headers-content"
                                id="request-headers-header"
                              >
                                <Typography>Request Headers</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <table className="header-table">
                                  <tbody>
                                    {Object.entries(
                                      selectedRequest.requestHeader
                                    ).map(([key, value]) => (
                                      <tr key={key}>
                                        <td>{key}</td>
                                        <td>{value}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </AccordionDetails>
                            </Accordion>

                            {/* Response Headers */}
                            <Accordion
                              expanded={expanded === "response-headers"}
                              onChange={() =>
                                setExpanded(
                                  expanded === "response-headers"
                                    ? ""
                                    : "response-headers"
                                )
                              }
                            >
                              <AccordionSummary
                                aria-controls="response-headers-content"
                                id="response-headers-header"
                              >
                                <Typography>Response Headers</Typography>
                              </AccordionSummary>
                              <AccordionDetails>
                                <table className="header-table">
                                  <tbody>
                                    {Object.entries(
                                      selectedRequest.responseHeader
                                    ).map(([key, value]) => (
                                      <tr key={key}>
                                        <td>{key}</td>
                                        <td>{value}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </AccordionDetails>
                            </Accordion>
                          </div>
                        </div>
                      </div>
                    </th>
                  ) : (
                    <>
                      <th>Status</th>
                      <th>Type</th>
                      <th>Size</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request, index) => (
                  <tr
                    key={index}
                    onClick={() => openDetailsModal(request)}
                    className="request-row"
                  >
                    <td className="url-column">{request.request_url}</td>
                    {!selectedRequest && (
                      <>
                        <td>{request.response_status}</td>
                        <td>{request.response_type}</td>
                        <td>{request.response_size} bytes</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {/*Modal */}
    </div>
  );
}

export default NetworkRequestsComponent;
