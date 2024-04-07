import axios from "axios";
import { useState } from "react";

const CustomInput = ({ que, onChange }) => {
	const [fileUploader, setFileUploader] = useState(null);
	const [fileNameUploader, setFileNameUploader] = useState(null);
	const downloadFile = async (filename) => {
		try {
		  const response = await axios.get(`http://localhost:3001/uploads/${filename}`, { responseType: 'blob' });
	  
		  const url = window.URL.createObjectURL(new Blob([response.data]));
		  const link = document.createElement('a');
		  link.href = url;
		  link.setAttribute('download', filename);
		  document.body.appendChild(link);
		  link.click();
		  link.remove();
		  window.URL.revokeObjectURL(url);
		} catch (error) {
		  console.log('Error downloading file:', error);
		}
	  };
	  const handleFileUpload = (e , que ,index) => {
		onChange(e, que);
		setFileUploader(e.target.files[0]);
	};
	const handleSubmit = (event) => {
		event.preventDefault();
	
		if (fileUploader) {
		  const formData = new FormData();
		  formData.append('file', fileUploader);
	
		  axios.post('http://localhost:3001/upload', formData)
	  .then((response) => {
		setFileNameUploader(response.data.fileName)
		console.log('نتیجه:', response.data.fileName
		);
	  })
	  .catch((error) => {
		console.error('خطا:', error);
	  });
		} else {
		  console.log('فایلی انتخاب نشده است.');
		}
	  };

	return (
		<div className="custom-input-wrapper">
			{que.type == "1" && (
				<div key={que.id}>
					<textarea
						className={"question-text-input question-text-input-" + que.id}
						cols="60"
						rows="4"
						placeholder="Enter your answer here"
						onChange={(e) => onChange(e, que)}
					/>
				</div>
			)}
			{que.type == "2" && (
				<div key={que.id}>
				<a onClick={() => downloadFile(que.fileName)} >دانلود {que.fileName}</a>
				<div className="file-uploader">
							<form onSubmit={handleSubmit}>
							<input
							 type="file"
							 accept=".pdf,.doc,.docx"
							 onChange={(e) => handleFileUpload(e, que)}
							 />
							 <button className="cancel-new-question-btn btn" type="submit">آپلود</button>
							 </form>
						 </div>
				</div>
			)}

			{que.type == "3" && (
				<div key={que.id}>
					{que.options.map((opn, index) => {
						return (
							<div className={`option radio `} key={index}>
								<input
									type="radio"
									value={opn}
									key={index}
									onChange={(e) => onChange(e, que, index)}
									name={`answer-radio-${que.id}`}
									className={`optionInput answer-radio-${que.id}-${index}`}
								/>
								{opn}
							</div>
						);
					})}
				</div>
			)}
			{que.type == "4" && (
				<div key={que.id}>
					{que.options.map((opn, index) => {
						return (
							<div className={`option checkBox`} key={index}>
								<input
									type="checkbox"
									value={opn}
									key={index}
									onChange={(e) => onChange(e, que, index)}
									className={`optionInput answer-checkbox-${que.id}-${index}`}
								/>
								{opn}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default CustomInput;
