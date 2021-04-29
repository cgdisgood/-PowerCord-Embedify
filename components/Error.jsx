const { React, messages, channels } = require("powercord/webpack");
const { clipboard } = require("electron");
const fetch = require("node-fetch");
const { FormTitle, Button } = require("powercord/components");
const { TextAreaInput, SwitchItem, RadioGroup, ColorPickerInput } = require("powercord/components/settings");
const { Modal } = require("powercord/components/modal");
const { close: closeModal } = require("powercord/modal");

class GeneratorModal extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			providerName: "",
			providerUrl: "",
			authorName: "",
			authorUrl: "",
			title: "",
			description: "",
			banner: false,
			image: "",
			color: "",
			userHasInputed: false
		};
		this.state.imageType = "none";
		this.hasUserInputed = () => {
			if (this.state.providerName == "" && this.state.authorName == "" && this.state.title == "" && this.state.description == "" && this.state.image == "") {
				this.setState({ userHasInputed: false });
			} else {
				this.setState({ userHasInputed: true });
			}
		};

		this._numberToHex = (color) => {
			const r = (color & 0xff0000) >>> 16;
			const g = (color & 0xff00) >>> 8;
			const b = color & 0xff;
			return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
		};
	}

	render() {
		return (
			<Modal className='powercord-text'>
				<Modal.Header>
					<FormTitle tag='h4'>An Error has occured, Please try again :/</FormTitle>
				</Modal.Header>
				<Modal.Footer>
					<Button onClick={closeModal} look={Button.Looks.LINK} color={Button.Colors.TRANSPARENT}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

module.exports = GeneratorModal;
