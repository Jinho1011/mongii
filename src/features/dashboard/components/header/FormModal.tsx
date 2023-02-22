import Modal from "react-modal";
import classNames from "classnames/bind";

import styles from "./Header.module.scss";
import {
  ChangeEvent,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { useCreateModule, useCreateNode } from "../../api";

const cx = classNames.bind(styles);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
  overlay: {
    zIndex: 999,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

interface FormModalProps {
  type: "fog" | "edge";
  isOpen: boolean;
  closeModal: () => void;
  fogs?: {
    name: string;
    ip: string;
  }[];
}

interface ModuleType {
  ip: string;
  info: string;
  name: string;
  giturl: string;
  install: string;
  execute: string;
  priority: number;
  env: string;
}

const FormModal = ({ type, isOpen, closeModal, fogs }: FormModalProps) => {
  const [input, setInput] = useState<{
    name: string;
    cloud: string;
    ip: string;
    rootpw: string;
    info: string;
  }>({
    name: "",
    cloud: "0.0.0.0",
    info: "",
    ip: "",
    rootpw: "",
  });
  const emptyModule: ModuleType = {
    name: "",
    giturl: "",
    install: "",
    execute: "",
    priority: 0,
    env: "",
    ip: "",
    info: "",
  };
  const [modules, setModules] = useState<ModuleType[]>([emptyModule]);
  const createNodeMutation = useCreateNode();
  const createModuleMutation = useCreateModule();

  const onRequestClose = () => {
    setInput({
      name: "",
      cloud: "",
      info: "",
      ip: "",
      rootpw: "",
    });
    setModules([emptyModule]);
    closeModal();
  };

  const handleFogSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    if (type === "fog") {
      createNodeMutation.mutate({
        ip: input.ip,
        name: input.name,
        info: input.info,
      });
    }

    modules.map((module) => {
      createModuleMutation.mutate({
        ip: module.ip,
        name: module.name,
        info: module.info,
        priority: module.priority,
        node_id: type === "fog" ? undefined : undefined,
        edge_id: type === "edge" ? undefined : undefined,
        github_url: "",
      });
    });

    fetch("http://ctr-mongy.bibim-bap.com/remote/register/", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        type: type === "fog" ? 1 : 0,
        ...input,
        modules,
      }), // body data type must match "Content-Type" header
    });

    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={customStyles}>
      <form className={cx("form-container")} onSubmit={handleFogSubmit}>
        <div>
          <div className={cx("form-row")}>
            <label className={cx("form-label")}>name</label>
            <input
              className={cx("form-input")}
              placeholder="name"
              type="text"
              value={input.name}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className={cx("form-row")}>
            <label className={cx("form-label")}>ip</label>
            <input
              className={cx("form-input")}
              placeholder="0.0.0.0"
              type="text"
              value={input.ip}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, ip: e.target.value }))
              }
            />
          </div>
          <div className={cx("form-row")}>
            <label className={cx("form-label")}>info</label>
            <input
              className={cx("form-input")}
              placeholder="description"
              type="text"
              value={input.info}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, info: e.target.value }))
              }
            />
          </div>
          <div className={cx("form-row")}>
            {type === "fog" ? (
              <>
                <label className={cx("form-label")}>cloud</label>
                <input
                  className={cx("form-input")}
                  placeholder="0.0.0.0"
                  type="text"
                  disabled={true}
                />
              </>
            ) : (
              <>
                <span className={cx("form-label")}>select fog node</span>
                <div className={cx("form-radio-container")}>
                  {fogs?.map((fog) => {
                    return (
                      <label key={fog.name}>
                        <input
                          className={cx("form-input-radio")}
                          type="radio"
                          name="fog"
                          checked={input.cloud === fog.ip}
                          value={fog.ip}
                          onChange={(e) =>
                            setInput((prev) => ({
                              ...prev,
                              cloud:
                                fogs?.find((fog) => fog.ip === e.target.value)
                                  ?.ip || "",
                            }))
                          }
                        />
                        <span className={cx("form-radio-label")}>
                          {fog.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </>
            )}
          </div>
          <div className={cx("form-row")}>
            <label className={cx("form-label")}>root pw</label>
            <input
              className={cx("form-input")}
              placeholder="root"
              type="text"
              value={input.rootpw}
              onChange={(e) =>
                setInput((prev) => ({ ...prev, rootpw: e.target.value }))
              }
            />
          </div>
          <div className={cx("form-divider")} />
          <div>
            {modules.map((module, index) => {
              return (
                <Module
                  module={module}
                  setModules={setModules}
                  index={index}
                  key={index}
                />
              );
            })}
          </div>
          <button
            className={cx("add-module-btn")}
            onClick={() => setModules((prev) => [...prev, emptyModule])}
          >
            add module
          </button>
        </div>

        <div className={cx("form-submit-container")}>
          <button className={cx("form-submit")} type="submit">
            submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

interface ModuleProps {
  index: number;
  module: ModuleType;
  setModules: Dispatch<SetStateAction<ModuleType[]>>;
}

const Module = ({ index, module, setModules }: ModuleProps) => {
  const [input, setInput] = useState(module);

  useEffect(() => {
    setModules((prev) =>
      prev.map((v, i) => {
        if (index === i) {
          return input;
        } else {
          return v;
        }
      })
    );
  }, [index, input, setModules]);

  return (
    <div className={cx("form-module-container")}>
      <span className={cx("form-module-title")}>{`module ${index + 1}`}</span>
      <div className={cx("form-row")}>
        <label className={cx("form-label")}>name</label>
        <input
          className={cx("form-input")}
          placeholder="name"
          type="text"
          value={input.name}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      </div>
      <div className={cx("form-row")}>
        <label className={cx("form-label")}>ip</label>
        <input
          className={cx("form-input")}
          placeholder="0.0.0.0"
          type="text"
          value={input.ip}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, ip: e.target.value }))
          }
        />
      </div>
      <div className={cx("form-row")}>
        <label className={cx("form-label")}>info</label>
        <input
          className={cx("form-input")}
          placeholder="description"
          type="text"
          value={input.info}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, info: e.target.value }))
          }
        />
      </div>
      <div className={cx("form-row")}>
        <label className={cx("form-label")}>github url</label>
        <input
          className={cx("form-input")}
          placeholder="github url"
          type="text"
          value={input.giturl}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, giturl: e.target.value }))
          }
        />
      </div>
      <div className={cx("form-row")}>
        <label className={cx("form-label")}>install script</label>
        <input
          className={cx("form-input")}
          placeholder="install script"
          type="text"
          value={input.install}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, install: e.target.value }))
          }
        />
      </div>
      <div className={cx("form-row")}>
        <label className={cx("form-label")}>execute script</label>
        <input
          className={cx("form-input")}
          placeholder="execute script"
          type="text"
          value={input.execute}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, execute: e.target.value }))
          }
        />
      </div>
      <div className={cx("form-row")}>
        <label className={cx("form-label")}>priority</label>
        <input
          className={cx("form-input")}
          placeholder="priority"
          type="number"
          value={input.priority}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, priority: Number(e.target.value) }))
          }
        />
      </div>
      <div className={cx("form-row")}>
        <label className={cx("form-label")}>env</label>
        <input
          className={cx("form-input")}
          placeholder="env"
          type="text"
          value={input.env}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, env: e.target.value }))
          }
        />
      </div>
    </div>
  );
};

export default FormModal;
