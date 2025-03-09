# 청소차량 관제시스템 (인원: 앱 2 + 웹 3)

## 개발환경
- Language: Java 17
- App: Android
- Frontend: Jsp, JavaScript, Ajax, chartJS,Html, Css(BootStrap)
- Backend: SpringBoot 3.1, ,Spring Batch 5, MyBatis
- DB: PostgreSQL
- Gis: GeoServer 2.2, Qgis, PostGis
- Api: OpenLayers, Vworld, GoogleMaps

## 목표
- 노면청소차량에 탑재된 센서를 이용하여 청소차량 관제시스템 구축
- 안드로이드 앱을 통해 차량 위치 및 경로 측정
- 차량센서를 대신하여 핸드폰 gps, 소음, 진동을 측정

## 프로젝트 주요 기능
- GeoServer를 통해 용인시 지역구 선택 및 이동 서비스
  1. PostGis와 GeoServer를 통해 구 레이어를 저장
  2. 저장된 레이어를 View로 전달 

- PostGis를 통해 청소차량의 측정된 데이터를 산출하여 청소경로 레이어 획득 서비스
  1. csv 형식으로 된 청소차량의 데이터 베이스에 저장
  2. 저장된 데이터를 PostGis를 통해 청소 경로, 비율, 시간을 계산
  3. 계산된 결과를 View로 전달
  
- 안드로이드앱과 웹서비스가 상호작용하여 실시간 차량의 위치 확인 가능
  1. 안드로이드 앱이 rest API 방식으로 1초 간격으로 센서 데이터 전송
  2. 서버에서 스케쥴러를 통해 주기적으로 데이터 응답
  3. 응답 데이터를 임시테이블에 저장
  4. 저장된 데이터중 최신 데이터를 주기적으로 View로 전달

## 역할
- 와이어프레임을 기반으로 프론트 뷰 제작
- 로컬 DB 자동화 모듈 구현
- 조건에 따른 레이어 기능 구현 및 출력
- 실시간 GPS 기능 구현
---

### 시스템 구성도
<img src="https://github.com/user-attachments/assets/8b3a452a-e902-46b9-90fa-634fb8b69ec1" width="70%" height="70%" />

- **데이터 수집 (안드로이드 앱)**  
사용자가 청소 차량에 설치된 안드로이드 앱을 실행하면, 앱은 차량에 부착된 센서(예: 속도, 상태 등)와 GPS 모듈로부터 실시간 데이터를 수집합니다. Google Maps API를 활용해 차량의 위치를 좌표화하고, 이 데이터를 주기적으로(예: 5초 간격) Spring Boot로 구축된 REST API 서버로 전송합니다. 데이터는 JSON 형식으로 구조화되어 HTTP POST 요청을 통해 서버로 전달됩니다.
- **데이터 처리 및 저장 (Spring Boot + PostgreSQL/PostGIS)**  
Spring Boot 서버는 전송된 센서 데이터와 GPS 좌표를 수신한 후, 이를 처리하여 PostgreSQL 데이터베이스에 저장합니다. 여기서 PostGIS 확장 기능을 활용해 공간 데이터를 관리합니다. 예를 들어, 차량의 시작 지점(Point), 도착 지점(Point), 그리고 이동 경로(LineString)를 PostGIS의 공간 함수(예: ST_Distance, ST_MakePoint)로 변환 및 저장합니다.
- **공간 데이터 제공 (GeoServer)**  
저장된 공간 데이터는 GeoServer로 전달됩니다. GeoServer는 PostgreSQL/PostGIS에 연결되어 WMS(Web Map Service)프로토콜을 통해 데이터를 제공합니다. 용인시의 기반 지도 레이어는 GeoServer에서 사전에 설정된 SLD(Styled Layer Descriptor)를 통해 스타일링되며, 차량 경로 데이터는 실시간으로 레이어에 반영됩니다. 필요 시 QGIS를 활용해 GeoServer의 데이터를 검증하거나 추가적인 지도 편집 작업을 수행했습니다.
- **시각화 (OpenLayers + JSP)**  
관리자 인터페이스는 JSP 기반의 웹 애플리케이션으로 구성되며, OpenLayers를 통해 GeoServer에서 제공되는 지도 레이어와 차량 경로를 동적으로 렌더링합니다. OpenLayers는 WMS 요청을 통해 용인시 지도와 차량의 실시간 위치를 표시하고, 경로를 선(Line)으로 그려줍니다. 관리자는 웹 브라우저에서 차량의 시작 지점, 도착 지점, 이동 경로를 한눈에 확인할 수 있으며, 필요 시 줌인/줌아웃, 레이어 전환 등의 인터랙티브 기능을 활용할 수 있습니다.

### ERD
<img src="https://github.com/user-attachments/assets/0f165f8b-3e10-4374-9a23-de4875087777" width="85%" height="85%" />

### UseCase Diagram
<div>
  <img src="https://github.com/user-attachments/assets/0bfbcf1c-fb24-4f11-9b61-447a5647adf1" width="45%" height="45%" />
  <img src="https://github.com/user-attachments/assets/ae4973eb-47ce-4be4-add7-06db94df3a7b" width="45%" height="45%" />
</div>

### Activity Diagram (차량별 / 실시간)
<div>
  <img src="https://github.com/user-attachments/assets/fc60daa0-e108-405d-8626-58e13f55c17f" width="45%" height="45%" />
  <img src="https://github.com/user-attachments/assets/718f72fc-3b3b-4331-81f6-d701565cdc9b" width="45%" height="45%" />
</div>

## 기능 화면

### 지역레이어 선택 & 지도 유형 선택
<img src="https://github.com/user-attachments/assets/d7ec3b1b-7741-40e8-b988-864b5e7ae507" width="90%" height="90%" /></b>
- GeoServer, OpenLayers, Qgis 등 Gis 기술을 사용하여 지역 레이어를 등록후 View로 전달

### 차량별 관제
<img src="https://github.com/user-attachments/assets/4b3a700a-1d3a-472b-90fb-3cae03bebdb2" width="90%" height="90%" /></b>
- 차량별, 날짜별 청소차량의 데이터를 PostGis를 통해 청소시간, 청소비율, 운행거리, 유효 운행거리 확인이 가능
- 측정된 좌표들을 GeoServer를 통해 가공후 레이어 생성 후 View로 전달
- 시각적 레이어를 통해 청소구간 확인이 가능 

### 안드로이드 앱 센서데이터 측정/전송
<img src="https://github.com/user-attachments/assets/e069d7dc-6648-45cb-9e33-96e4ce4e9aba" width="90%" height="90%" /></b>
1. 사용자는 START 버튼을 누르고 탑승한 차량번호 입력
2. 실시간 전송 시작 -> 실시간으로 사용자 GPS를 통해 운행경로를 저장

### 실시간 다중 차량 관제
<img src="https://github.com/user-attachments/assets/5dc6ad41-760e-45e3-8ebe-d1022f22aac0" width="90%" height="90%" /></b>
1. App에서 실시간으로 차량의 gps 위치 전송
2. Web에서 실시간 활성버튼을 통해 현재 운행중인 차량들의 위치 확인이 가능
3. App에서 기록을 종료하면 실시간 데이터를 받기위한 차량별 임시테이블 삭제 




