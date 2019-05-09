import React from "react";
import "../../styles/App.css";
import "../../styles/grid.css";
import "../../styles/normalize.css";
import "../../styles/RequestDetail.css";
// import { getRequestQuery } from "../../queries/queries";
// import { graphql } from "react-apollo";

// import { Link } from "react-router-dom";
// import fileLogo from "../../Resources/Icons/iconfinder_ic_attach_file_48px_352032.svg";
import replyArrow from "../../Resources/Icons/iconfinder_reply_226602.svg";
// import arrow from "../../Resources/Icons/iconfinder_icon-ios7-arrow-down_211687.svg";

class ThreadBlock extends React.Component {
  componentDidMount() {
    this.setState({
      id: this.props.id
    });
  }

  render() {
    // let linkStr = "requestDetail/" + this.props.id;

    let pageId = window.location.pathname[1];
    // console.log(pageId);
    let isClient = pageId === "c";

    return (
      <div>
        {this.props.threads.map(item => {
          // console.log(item);
          return (
            <div key={item.id} className="thread-stream">
              <div className="text-boxes">
                <div className="enquiry-head-reply">
                  <div className="reply-attach">
                    <img
                      src={replyArrow}
                      className="reply-arrow-new-2"
                      alt="reply-arrow"
                    />
                  </div>

                  <div className="from-to">
                    <div className="border-from-to">
                      {isClient ? (
                        <p className="recipient">From: Joseph</p>
                      ) : (
                        <p className="recipient">From: Benjamin</p>
                      )}
                      {/* <p>To: Jane Lim</p> */}

                      {isClient ? <p>To: Benjamin</p> : <p>To: Joseph</p>}
                    </div>
                  </div>

                  <p className="timing"> {item.threadCreatedDate}</p>
                </div>

                <div className="enquiry-body">
                  {/* for multi-line input */}
                  {item.threadContent.split("\n").map((i, key) => {
                    if (i === "") {
                      return <div key={key}>{<br />}</div>;
                    }

                    return <div key={key}>{i}</div>;
                  })}
                </div>
                <div className="attachedImageAccess">
                  {item.threadImage === "" ? null : (
                    <a className="url-bottom-left" href={item.threadImage}>
                      View attached image
                    </a>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default ThreadBlock;
