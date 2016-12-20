<%@ page contentType="text/html;charset=UTF-8" %>
<%@ page import="nc.imag.pub.util.ImageServiceUtil"%>
<%@ page language="java" import="nc.uap.lfw.core.LfwRuntimeEnvironment"%>
<%  
String userid = LfwRuntimeEnvironment.getLfwSessionBean().getPk_user();
%>


<html>
	<head>
	<script>
			<% String url=ImageServiceUtil.singleLoginURL(userid);%>
			window.location.href="<%= url %>";
    </script>
	</head>
	<body >
	</body>
</html>