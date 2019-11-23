# Plant Disease Detector

- Goal: Use images of plants to detect any kind of diseases
- Target audience: Farmers, Plant enthusiasts

Current development deployment on IBM Cloud K8s: http://173.193.106.54:32594/

# Abstract

Agriculture in the United States is a major driver of economic growth, accounting for 11% percent of total employment and $132.8 billion dollars to U.S. GDP in 2017 [1]. Increasing efficiency and reducing waste is a key research area in agricultural, particularly as climate change creates favorable conditions for pests and diseases to proliferate throughout a crop. Our project provides a tool to help farmers discover diseases within their crop by using IBM’s visual recognition API to identify diseases of interest to farm owners. The tool provides farmers a platform to train a machine learning model customized to their problem while also providing a dashboard for visualizing past predictions, if needed. The model is trained and validated on the PlantVillage-Dataset.

# Architecture Diagram

![Diagram](/architecture_diagram.png)

# Technology Stack

[IBM Watson Visual Recognition](https://www.ibm.com/watson/services/visual-recognition/)<br />
[AWS Lambda](https://aws.amazon.com/lambda/)<br />
[Amazon S3](https://aws.amazon.com/s3/)<br />
[Amazon DynamoDB](https://aws.amazon.com/dynamodb/)<br />
[React](https://reactjs.org/)<br />
[Node.js](https://nodejs.org/)<br />
[Kubernetes](https://kubernetes.io/)<br />
[Docker](https://www.docker.com/)<br />
[Jenkins](https://jenkins.io/)

# Design Thinking
The Web app allows family farms to use computer vision to measure crop health and analyze historical trends with ease.

# Sources 

1. https://www.ers.usda.gov/data-products/ag-and-food-statistics-charting-the-essentials/ag-and-food-sectors-and-the-economy/
