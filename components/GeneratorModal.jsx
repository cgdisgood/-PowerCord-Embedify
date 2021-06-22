const { React, messages, channels } = require("powercord/webpack");
const { clipboard } = require("electron");
const fetch = require("node-fetch");
const { FormTitle, Button } = require("powercord/components");
const { TextAreaInput, SwitchItem, RadioGroup, ColorPickerInput } = require("powercord/components/settings");
const { Modal } = require("powercord/components/modal");
const { close: closeModal, open } = require("powercord/modal");
const ErrorModal = require("./Error");
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
			text: "",
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
					<FormTitle tag='h4'>Embedify (embeds.ga)</FormTitle>
				</Modal.Header>
				<Modal.Content>
				<TextAreaInput
						value={this.state.text}
						onChange={async (o) => {
							await this.setState({ text: o.toString() });
							this.hasUserInputed();
						}}
						rows={1}>
						Text
					</TextAreaInput>

					<TextAreaInput
						value={this.state.providerName}
						onChange={async (o) => {
							await this.setState({ providerName: o.toString() });
							this.hasUserInputed();
						}}
						rows={1}>
						Provider Name
					</TextAreaInput>
					<TextAreaInput
						value={this.state.providerUrl}
						onChange={async (o) => {
							await this.setState({ providerUrl: o.toString() });
							this.hasUserInputed();
						}}
						rows={1}>
						Provider URL
					</TextAreaInput>
					<TextAreaInput
						value={this.state.authorName}
						onChange={async (o) => {
							await this.setState({ authorName: o.toString() });
							this.hasUserInputed();
						}}
						rows={1}>
						Author Name
					</TextAreaInput>
					<TextAreaInput
						value={this.state.authorUrl}
						onChange={(o) => {
							this.setState({ authorUrl: o.toString() });
						}}
						rows={1}>
						Author URL
					</TextAreaInput>
					<TextAreaInput
						value={this.state.title}
						onChange={async (o) => {
							await this.setState({ title: o.toString() });
							this.hasUserInputed();
						}}
						rows={1}>
						Title
					</TextAreaInput>
					<TextAreaInput
						value={this.state.description}
						onChange={async (o) => {
							await this.setState({ description: o.toString() });
							this.hasUserInputed();
						}}
						rows={4}>
						Description
					</TextAreaInput>
					<RadioGroup
						disabled={false}
						defaultChecked
						options={[
							{ name: "None", value: "none" },
							{ name: "Thumbnail", value: "thumbnail" },
							{ name: "Large", value: "large" },
							{ name: "Video", value: "video" }
						]}
						value={this.state.imageType}
						onChange={(e) => {
							this.setState({ imageType: e.value });
						}}>
						Image Type
					</RadioGroup>
					<TextAreaInput
						disabled={this.state.imageType === "none"}
						value={this.state.image}
						onChange={async (o) => {
							await this.setState({ image: o.toString() });
							this.hasUserInputed();
						}}
						rows={1}>
						<p>{this.state.imageType} URL</p>
					</TextAreaInput>
					<TextAreaInput
						disabled={this.state.imageType !== "video"}
						value={this.state.thumbnail}
						onChange={async (o) => {
							await this.setState({ thumbnail: o.toString() });
							this.hasUserInputed();
						}}
						rows={1}>
						<p>Thumbnail</p>
					</TextAreaInput>
					<ColorPickerInput onChange={(c) => this.setState({ color: c ? this._numberToHex(c) : null })} default={parseInt("202225", 16)} value={this.state.color ? parseInt(this.state.color.slice(1), 16) : 0}>
						Color
					</ColorPickerInput>
					<div style={{ marginBottom: 20 }} />
				</Modal.Content>
				<Modal.Footer>
					<Button
						color={Button.Colors.GREEN}
						disabled={!this.state.userHasInputed}
						onClick={async () => {
							let url = `https://embeds.ga/?deg&provider=${this.state.providerName ? encodeURIComponent(this.state.providerName) : ""}&provider=${this.state.providerUrl ? encodeURIComponent(this.state.providerUrl) : ""}&author=${this.state.authorName ? encodeURIComponent(this.state.authorName) : ""}&authorurl=${this.state.authorUrl ? encodeURIComponent(this.state.authorUrl) : ""}&title=${this.state.title ? encodeURIComponent(this.state.title) : ""}&color=${this.state.color ? encodeURIComponent(this.state.color) : ""}&media=${this.state.imageType}&mediathumb=${this.state.thumbnail}&mediaurl=${this.state.image ? encodeURIComponent(this.state.image) : ""}&desc=${this.state.description ? encodeURIComponent(this.state.description) : ""}`;

							console.log(url);
							let data = await fetch(`https://embeds.ga/api/create.php`, {
								method: "post",
								body: JSON.stringify({ url }),
								mode: "no-cors",
								headers: {
									"Content-Type": "application/json"
								}
							})
								.then((res) => res.json())
								.then((d) => {
									if (d.success === false || d.success === "false") return open(() => React.createElement(ErrorModal));
									messages.sendMessage(channels.getChannelId(), {
										content: `${text}||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​|| https://embeds.ga/e/${d.code}`
									});
								})
								.catch((e) => {
									console.log(e);
									open(() => React.createElement(ErrorModal));
								});

							closeModal();
						}}>
						Send
					</Button>
					<Button
						style={{ marginRight: "10px" }}
						disabled={!this.state.userHasInputed}
						onClick={async () => {
							function format(item) {
								return item ? encodeURIComponent(item) : "";
							}
							let url = `https://embeds.ga/?deg&provider=${format(this.state.providerName)}&providerurl=${format(this.state.providerUrl)}&author=${format(this.state.authorName)}&authorurl=${format(this.state.authorUrl)}&title=${format(this.state.title)}&color=${format(this.state.color)}&media=${this.state.imageType}&mediathumb=${this.state.thumbnail}&mediaurl=${format(this.state.image)}&desc=${format(this.state.description)}`;

							console.log(url);
							let data = await fetch(`https://embeds.ga/api/create.php`, {
								method: "post",
								body: JSON.stringify({ url }),
								mode: "no-cors",
								headers: {
									"Content-Type": "application/json"
								}
							})
								.then((res) => res.json())
								.then((d) => {
									if (d.success === false || d.success === "false") return open(() => React.createElement(ErrorModal));
									clipboard.writeText(`${text}||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||https://embeds.ga/e/${d.code}`, "selection");
								})
								.catch((e) => {
									console.log(e);
									open(() => React.createElement(ErrorModal));
								});

							closeModal();
						}}>
						Copy
					</Button>
					<Button onClick={closeModal} look={Button.Looks.LINK} color={Button.Colors.TRANSPARENT}>
						Cancel
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

module.exports = GeneratorModal;
