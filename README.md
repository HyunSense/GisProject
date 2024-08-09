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




